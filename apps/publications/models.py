from django.db import models

# Create your models here.
class Publication(models.Model):
    title = models.CharField("Название", max_length=300)
    authors = models.CharField("Авторы", max_length=300)
    journal = models.CharField("Журнал / источник", max_length=300)
    link = models.URLField("Ссылка на скачивание", blank=True)

    def __str__(self):
        return self.title