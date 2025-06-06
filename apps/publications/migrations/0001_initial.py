# Generated by Django 4.2.21 on 2025-05-21 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Publication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300, verbose_name='Название')),
                ('authors', models.CharField(max_length=300, verbose_name='Авторы')),
                ('journal', models.CharField(max_length=300, verbose_name='Журнал / источник')),
                ('link', models.URLField(blank=True, verbose_name='Ссылка на скачивание')),
            ],
        ),
    ]
