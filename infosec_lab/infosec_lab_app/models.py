from django.db import models

class News(models.Model):
    title = models.CharField("Заголовок", max_length=200)
    excerpt = models.TextField("Краткое описание")
    date = models.DateField("Дата публикации")
    image = models.ImageField("Изображение", upload_to="news_images/")
    content = models.TextField("Полное описание")

    def __str__(self):
        return self.title

class Publication(models.Model):
    title = models.CharField("Название", max_length=300)
    authors = models.CharField("Авторы", max_length=300)
    journal = models.CharField("Журнал / источник", max_length=300)
    link = models.URLField("Ссылка на скачивание", blank=True)

    def __str__(self):
        return self.title
    
class Staff(models.Model):
    name      = models.CharField("ФИО", max_length=150)
    position  = models.CharField("Должность", max_length=150)
    bio       = models.TextField("Краткая биография", blank=True)
    image     = models.ImageField(
        "Фотография",
        upload_to="staff_images/",
        blank=True,
        null=True,
    )
    email     = models.EmailField("E-mail", blank=True)
    phone     = models.CharField("Телефон", max_length=30, blank=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name
    
class Project(models.Model):
    title       = models.CharField("Название проекта", max_length=300)
    goal        = models.TextField("Цель проекта")
    result      = models.TextField("Результаты", blank=True)
    start_year  = models.PositiveSmallIntegerField("Начало", default=2024)
    end_year    = models.PositiveSmallIntegerField("Окончание", blank=True, null=True)
    sponsor     = models.CharField("Спонсор / заказчик", max_length=150, blank=True)
    image       = models.ImageField("Изображение", upload_to="project_images/", blank=True, null=True)

    class Meta:
        ordering = ["-start_year"]

    def __str__(self):
        return self.title

