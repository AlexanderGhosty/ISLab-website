from django.db import models


class TextBlock(models.Model):
    key = models.CharField("Key", max_length=100, unique=True)
    content = models.TextField("Content", blank=True)

    class Meta:
        verbose_name = "Text Block"
        verbose_name_plural = "Text Blocks"

    def __str__(self):
        return self.key
