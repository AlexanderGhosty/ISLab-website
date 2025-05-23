from django.db import models


class Project(models.Model):
    title = models.CharField("Название проекта", max_length=300)
    goal = models.TextField("Цель проекта")
    result = models.TextField("Результаты", blank=True)
    start_year = models.PositiveSmallIntegerField("Начало", default=2024)
    end_year = models.PositiveSmallIntegerField("Окончание", blank=True, null=True)
    sponsor = models.CharField("Спонсор / заказчик", max_length=150, blank=True)
    image = models.ImageField("Изображение", upload_to="project_images/", blank=True, null=True)

    class Meta:
        ordering = ["-start_year"]

    def __str__(self):
        return self.title
