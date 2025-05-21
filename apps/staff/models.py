from django.db import models


class Staff(models.Model):
    name = models.CharField("ФИО", max_length=150)
    position = models.CharField("Должность", max_length=150)
    bio = models.TextField("Краткая биография", blank=True)
    image = models.ImageField(
        "Фотография",
        upload_to="staff_images/",
        blank=True,
        null=True,
    )
    email = models.EmailField("E-mail", blank=True)
    phone = models.CharField("Телефон", max_length=30, blank=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name
