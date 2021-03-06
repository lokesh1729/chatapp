# Generated by Django 2.0.13 on 2019-06-25 04:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BaseModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('updated_on', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='ChatRoom',
            fields=[
                ('basemodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, to='chat.BaseModel')),
                ('name', models.CharField(max_length=255, primary_key=True, serialize=False, verbose_name='Name of the room')),
            ],
            bases=('chat.basemodel',),
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('basemodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='chat.BaseModel')),
                ('text', models.TextField(blank=True, null=True)),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='messages', related_query_name='message', to='chat.ChatRoom')),
            ],
            bases=('chat.basemodel',),
        ),
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('basemodel_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='chat.BaseModel')),
                ('room', models.ManyToManyField(related_name='participants', related_query_name='participant', to='chat.ChatRoom')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='participants', related_query_name='participant', to=settings.AUTH_USER_MODEL)),
            ],
            bases=('chat.basemodel',),
        ),
        migrations.AddField(
            model_name='message',
            name='sender',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_messages', related_query_name='sent_message', to='chat.Participant'),
        ),
    ]
