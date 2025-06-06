# Generated by Django 4.2.21 on 2025-05-21 15:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='Заголовок')),
                ('excerpt', models.TextField(verbose_name='Краткое описание')),
                ('date', models.DateField(verbose_name='Дата публикации')),
                ('image', models.ImageField(upload_to='news_images/', verbose_name='Изображение')),
                ('content', models.TextField(verbose_name='Полное описание')),
            ],
        ),
        migrations.CreateModel(
            name='NewsImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='news_images/extra/', verbose_name='Файл изображения')),
                ('news', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='news.news', verbose_name='Новость')),
            ],
            options={
                'ordering': ['id'],
            },
        ),
    ]
