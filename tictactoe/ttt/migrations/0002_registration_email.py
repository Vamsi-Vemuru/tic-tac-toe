# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-05 05:55
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('ttt', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='registration',
            name='email',
            field=models.EmailField(default=datetime.datetime(2015, 12, 5, 5, 55, 34, 373000, tzinfo=utc), max_length=254),
            preserve_default=False,
        ),
    ]
