# Generated by Django 2.1.7 on 2019-03-30 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20190329_1806'),
    ]

    operations = [
        migrations.AddField(
            model_name='server',
            name='image',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.TextField(blank=True),
        ),
    ]
