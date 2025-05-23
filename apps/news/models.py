from django.db import models


# Create your models here.


class News(models.Model):
    title = models.CharField("Заголовок", max_length=200)
    excerpt = models.TextField("Краткое описание")
    date = models.DateField("Дата публикации")
    image = models.ImageField("Изображение", upload_to="news_images/")
    content = models.TextField("Полное описание")

    def __str__(self):
        return self.title


class NewsImage(models.Model):
    news = models.ForeignKey(
        News,
        related_name="images",
        on_delete=models.CASCADE,
        verbose_name="Новость",
    )
    image = models.ImageField("Файл изображения", upload_to="news_images/extra/")

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"Image for {self.news.title}"
