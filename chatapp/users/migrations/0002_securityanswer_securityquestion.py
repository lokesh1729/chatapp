# Generated by Django 2.2.3 on 2019-07-17 17:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SecurityQuestion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField()),
                ('users', models.ManyToManyField(related_name='security_questions', related_query_name='security_question', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='SecurityAnswer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.CharField(max_length=100)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='security_answers', related_query_name='security_answer', to='users.SecurityQuestion', verbose_name='Security Question')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='security_answers', related_query_name='security_answer', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
