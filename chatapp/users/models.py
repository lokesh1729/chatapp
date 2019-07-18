from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.conf import settings
from django.contrib.auth import hashers
from django.utils.translation import ugettext_lazy as _

user_model_label = getattr(settings, 'AUTH_USER_MODEL', 'auth.User')

class User(AbstractUser):

    # First Name and Last Name do not cover name patterns
    # around the globe.
    name = models.CharField(_("Name of User"), blank=True, max_length=255)
    last_seen = models.DateTimeField(_("Last Seen"), default=timezone.now)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})


class SecurityQuestion(models.Model):
    users = models.ManyToManyField(user_model_label,
                             related_name="security_questions",
                             related_query_name="security_question")
    question = models.TextField(null=False, blank=False)

    def __unicode__(self):
        return _("%s - %s") % (self.users, self.question)


class SecurityAnswer(models.Model):
    user = models.ForeignKey(user_model_label, on_delete=models.CASCADE,
                             related_name="security_answers", related_query_name="security_answer")
    question = models.ForeignKey(SecurityQuestion, verbose_name=_("Security Question"),
                                 on_delete=models.CASCADE, related_name="security_answers",
                                 related_query_name="security_answer")
    answer = models.CharField(max_length=100, null=False, blank=False)

    def __unicode__(self):
        return _("%s - %s") % (self.user, self.question)

    def hash_current_answer(self):
        self.set_answer(self.answer)

    def set_answer(self, raw_answer):
        if not bool(getattr(settings, "SECURITY_QUESTIONS_CASE_SENSITIVE", False)):
            raw_answer = raw_answer.upper()
        self.answer = hashers.make_password(raw_answer)

    def check_answer(self, raw_answer):
        if not bool(getattr(settings, "SECURITY_QUESTIONS_CASE_SENSITIVE", False)):
            raw_answer = raw_answer.upper()

        def setter(raw_answer):
            self.set_answer(raw_answer)
            self.save(update_fields=["answer"])
        return hashers.check_password(raw_answer, self.answer, setter)

    def set_unusable_answer(self):
        self.answer = hashers.make_password(None)

    def has_usable_answer(self):
        return hashers.is_password_usable(self.answer)
