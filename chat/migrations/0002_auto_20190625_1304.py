# Generated by Django 2.0.13 on 2019-06-25 07:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='participant',
            old_name='room',
            new_name='rooms',
        ),
    ]
