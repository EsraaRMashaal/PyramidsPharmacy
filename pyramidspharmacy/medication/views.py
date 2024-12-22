from django.contrib.auth.models import User
from django.http.request import HttpRequest

from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404

from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Medication, RefillRequest
from .serializers import MedicationSerializer, RefillRequestSerializer
from .utils import validate_stock_availability, deduct_stock_and_approve, validate_rejected_reason


class MedicationViewSet(viewsets.ModelViewSet):
    queryset = Medication.objects.all()
    serializer_class = MedicationSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filter_fields = ["name", "dosage_form", "manufacturer", "category"]
    search_fields = ["name"]
    ordering_fields = ["name", "price", "stock"]


class RefillRequestViewSet(viewsets.ModelViewSet):
    queryset = RefillRequest.objects.select_related('medication', 'requested_by', 'approved_by').all()
    serializer_class = RefillRequestSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filter_fields = ["status", "medication__name", "requested_by__username"]
    search_fields = ["medication__name", "requested_by__username"]
    ordering_fields = ["requested_on", "status"]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)
        return queryset

    @action(detail=False, methods=["POST"], permission_classes=[IsAuthenticated])
    def submit_refill_request(self, request: HttpRequest):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        refill_request = serializer.save()
        return Response(
            {
                "message": "Refill request submitted successfully.",
                "refill_request": RefillRequestSerializer(refill_request).data,
            },
            status=status.HTTP_201_CREATED,
        )

    @action(detail=False, methods=["PATCH"], permission_classes=[IsAuthenticated])
    def change_request_status(self, request: HttpRequest):
        request_id = request.data.get("request_id")
        new_status = request.data.get("status")

        # Ensure required fields are provided
        if not request_id or not new_status:
            return Response(
                {"message": "Both 'request_id' and 'status' are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Fetch refill request object
        refill_request = get_object_or_404(RefillRequest, pk=request_id)

        # Validate and process based on the new status
        if new_status == "Approved":
            stock_validation_response = validate_stock_availability(refill_request)
            if stock_validation_response:
                return stock_validation_response
            
            try:
                deduct_stock_and_approve(refill_request)
            except Exception as e:
                return Response(
                    {"message": "An error occurred while processing the stock deduction."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
            
        
        elif new_status == "Rejected":
            rejected_reason_response = validate_rejected_reason(request)
            if rejected_reason_response:
                return rejected_reason_response
            refill_request.rejected_reason = request.data.get("rejected_reason")
        
        # Common operations for both status changes
        refill_request.status = new_status
        refill_request.approved_by = request.user  # User who approved/rejected
        refill_request.save()

        return Response(
            {
                "message": f"Refill request status updated to {new_status}.",
                "refill_request": RefillRequestSerializer(refill_request).data,
            },
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["GET"], permission_classes=[IsAuthenticated])
    def get_statistics(self, request: HttpRequest):
        medication_count = Medication.get_total_medication_count()
        refill_count = RefillRequest.get_refill_count()
        pending_refill_count = RefillRequest.get_pending_refill_count()
        approved_refill_count = RefillRequest.get_approved_refill_count()
        rejected_refill_count = RefillRequest.get_rejected_refill_count()
        refill_statistics = RefillRequest.get_refill_statistics()
        total_requests_by_status = RefillRequest.get_total_requests_by_status()
        total_requests_by_user = RefillRequest.get_total_requests_by_user()

        return Response(
            {
                "medication_count": medication_count,
                "refill_count": refill_count,
                "pending_refill_count": pending_refill_count,
                "approved_refill_count": approved_refill_count,
                "rejected_refill_count": rejected_refill_count,
                "refill_statistics": refill_statistics,
                "total_requests_by_status": total_requests_by_status,
                "total_requests_by_user": total_requests_by_user,
            },
            status=status.HTTP_200_OK,
        )
