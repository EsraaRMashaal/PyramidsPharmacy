from rest_framework.response import Response
from rest_framework import status

def validate_stock_availability(refill_request):
    """
    Validates whether the requested quantity of medication is within the available stock.

    Args:
        refill_request (RefillRequest): The refill request object to validate.

    Returns:
        Response | None: Returns a Response object with an error message if validation fails,
                         otherwise returns None.
    """
    if refill_request.quantity > refill_request.medication.stock:
        return Response(
            {"message": "Refill request quantity exceeds available stock."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    return None


def deduct_stock_and_approve(refill_request):
    """
    Deducts the requested quantity from the medication's stock and marks the refill request as approved.

    Args:
        refill_request (RefillRequest): The refill request to process.

    Returns:
        None
    """
    medication = refill_request.medication
    medication.stock -= refill_request.quantity
    medication.save()

    refill_request.status = "Approved"
    refill_request.save()


def validate_rejected_reason(request):
    """
    Validates if the 'rejected_reason' is provided in the request data.

    Args:
        request (HttpRequest): The request containing the data.

    Returns:
        Response: Returns a Response with an error message if rejected_reason is missing, else None.
    """
    rejected_reason = request.data.get("rejected_reason")
    if not rejected_reason:
        return Response(
            {"message": "'rejected_reason' is required for rejection."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    return None  # No validation error

