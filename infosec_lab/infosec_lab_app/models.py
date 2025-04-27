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

