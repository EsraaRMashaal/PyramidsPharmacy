from django.contrib.auth.models import User
from .models import Medication, RefillRequest
from rest_framework import serializers
from users.serializers import UserSerializer

class SimpleMedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = ['id', 'name']

class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = '__all__'


class RefillRequestSerializer(serializers.ModelSerializer):
    medication = serializers.PrimaryKeyRelatedField(queryset=Medication.objects.all())
    medication_details = serializers.SerializerMethodField()
    requested_by = UserSerializer(read_only=True)
    approved_by = UserSerializer(read_only=True, allow_null=True)
    requested_at = serializers.SerializerMethodField()
    approved = serializers.SerializerMethodField()

    class Meta:
        model = RefillRequest
        fields = '__all__'

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['requested_by'] = request.user
        return super().create(validated_data)
    
    def get_approved(self, obj):
        return obj.approved_by is not None
    
    def get_requested_at(self, obj):
        return obj.requested_at.strftime('%d-%m-%Y %I:%M %p')
    
    def get_medication_details(self, obj):
        return SimpleMedicationSerializer(obj.medication).data