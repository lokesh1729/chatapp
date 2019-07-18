from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True, max_length=255)
    last_seen = models.DateTimeField(_("Last Seen"), default=timezone.now)
    security_question1 = models.TextField(blank=True, null=True)
    security_question2 = models.CharField(blank=True, null=True, max_length=255)
    security_answer1 = models.TextField(blank=True, null=True)
    security_answer2 = models.CharField(blank=True, null=True, max_length=255)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})
