from django.db import models
from django.contrib.auth.models import User
from django.db.models import Count, Sum


class TimeStampedModel(models.Model):
    """
    An abstract base class model that provides self-updating
    ``created_at`` and ``updated_at`` fields.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


"""

"""
DOSAGE_FORMS = (
    ('Tablet', 'Tablet'),
    ('Capsule', 'Capsule'),
    ('Syrup', 'Syrup'),
    ('Injection', 'Injection'),
    ('Cream', 'Cream'),
    ('Ointment', 'Ointment'),
    ('Gel', 'Gel'),
    ('Drops', 'Drops'),
    ('Inhaler', 'Inhaler'),
    ('Suppository', 'Suppository'),
    ('Patch', 'Patch'),
    ('Solution', 'Solution'),
    ('Suspension', 'Suspension'),
    ('Spray', 'Spray'),
    ('Lotion', 'Lotion'),
    ('Lozenge', 'Lozenge'),
    ('Powder', 'Powder'),
    ('Granules', 'Granules'),
    ('Mouthwash', 'Mouthwash'),
    ('Shampoo', 'Shampoo'),
    ('Gargle', 'Gargle'),
    ('Enema', 'Enema'),
    ('Mouth Paint', 'Mouth Paint'),
    ('Ear Drops', 'Ear Drops'),
    ('Nasal Drops', 'Nasal Drops'),
    ('Eye Drops', 'Eye Drops'),
    ('Eye Ointment', 'Eye Ointment'),
    ('Eye Gel', 'Eye Gel'),
    ('Ear Spray', 'Ear Spray'),
    ('Ear Gel', 'Ear Gel'),
    ('Ear Ointment', 'Ear Ointment'),
)


"""

"""
MEDICATION_CATEGORIES = (
    ('Antibiotics', 'Antibiotics'),
    ('Antipyretics', 'Antipyretics'),
    ('Analgesics', 'Analgesics'),
    ('Antimalarials', 'Antimalarials'),
    ('Antacids', 'Antacids'),
    ('Antihistamines', 'Antihistamines'),
    ('Antifungals', 'Antifungals'),
    ('Antivirals', 'Antivirals'),
    ('Antitussives', 'Antitussives'),
    ('Expectorants', 'Expectorants'),
    ('Laxatives', 'Laxatives'),
    ('Antidiarrheals', 'Antidiarrheals'),
    ('Antispasmodics', 'Antispasmodics'),
    ('Antiemetics', 'Antiemetics'),
    ('Antihypertensives', 'Antihypertensives'),
    ('Anticoagulants', 'Anticoagulants'),
    ('Anticonvulsants', 'Anticonvulsants'),
    ('Antidepressants', 'Antidepressants'),
    ('Antipsychotics', 'Antipsychotics'),
    ('Antidiabetics', 'Antidiabetics'),
)
REFILL_REQUEST_STATUSES = (
    ('Pending', 'Pending'),
    ('Approved', 'Approved'),
    ('Rejected', 'Rejected'),
)

class Medication(TimeStampedModel):
    """
    Model for Medication objects
    that will store medication details for the pharmacy
    medication means the drug that is used to cure the disease or to reduce the symptoms of the disease.
    """
    name = models.CharField(max_length=255)
    description = models.TextField()
    stock = models.IntegerField(default=0, help_text="Current stock of the medication")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    dosage_form = models.CharField(max_length=255, choices=DOSAGE_FORMS, blank=True, null=True, help_text="The form in which the medication is available")
    manufacturer = models.CharField(max_length=255, blank=True, null=True, help_text="The company that manufactures the medication")
    expiry_date = models.DateField(blank=True, null=True, help_text="The date after which the medication should not be used")
    category = models.CharField(max_length=255, choices=MEDICATION_CATEGORIES, blank=True, null=True, help_text="The category of the medication based on its use in treatment")
    prescription_required = models.BooleanField(default=False, help_text="Whether a prescription is required to purchase this medication")

    def __str__(self):
        return self.name
    
    @staticmethod
    def get_total_medication_count():
        """
        Get total count of medications
        """
        return Medication.objects.distinct('name').count()

class RefillRequest(TimeStampedModel):
    """
    Model for Refill Requests
    """
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE, related_name='refill_requests', help_text="The medication for which the refill is requested")
    quantity = models.IntegerField()
    status = models.CharField(max_length=255, choices=REFILL_REQUEST_STATUSES, default='Pending')
    requested_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='refill_requested_by', help_text="The user who requested the refill")
    approved_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='refill_approved_by', blank=True, null=True, help_text="The user who approved the refill")
    requested_at = models.DateTimeField(auto_now_add=True, help_text="The date and time at which the refill was requested")
    approved_at = models.DateTimeField(blank=True, null=True, help_text="The date and time at which the refill was approved")
    notes = models.TextField(blank=True, null=True, help_text="Additional notes for the refill request")
    rejected_reason = models.TextField(blank=True, null=True, help_text="Reason for rejecting the refill request")

    def __str__(self):
        return f"{self.medication.name} - {self.quantity} - requested by {self.requested_by.username}"

    @staticmethod
    def get_refill_statistics():
        """
        Get refill statistics based on the medication, status, user
        """
        return RefillRequest.objects.values('medication__name').annotate(total_refills=Count('id')).order_by('-total_refills')
    
    @staticmethod
    def get_total_requests_by_status():
        """
        Get total refill requests by status (Pending, Approved, Rejected) 
        """
        return RefillRequest.objects.values('status').annotate(total_requests=Count('id')).order_by('-total_requests')
    
    @staticmethod
    def get_total_requests_by_user():
        """
        Get total refill requests by user 
        """
        return RefillRequest.objects.values('requested_by__username').annotate(total_requests=Count('id')).order_by('-total_requests')
    
    @staticmethod
    def get_medication_count():
        """
        Get total count of medications
        """
        return Medication.objects.count()
    
    @staticmethod
    def get_refill_count():
        """
        Get total count of refill requests
        """
        return RefillRequest.objects.count()
    
    @staticmethod
    def get_pending_refill_count():
        """
        Get total count of pending refill requests
        """
        return RefillRequest.objects.filter(status='Pending').count()
    
    @staticmethod
    def get_approved_refill_count():
        """
        Get total count of approved refill requests
        """
        return RefillRequest.objects.filter(status='Approved').count()
    
    @staticmethod
    def get_rejected_refill_count():
        """
        Get total count of rejected refill requests
        """
        return RefillRequest.objects.filter(status='Rejected').count()
    
