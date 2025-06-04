from django import template
from django.core.exceptions import ObjectDoesNotExist

from ..models import TextBlock

register = template.Library()


@register.simple_tag
def textblock(key):
    try:
        block = TextBlock.objects.get(key=key)
        return block.content
    except ObjectDoesNotExist:
        return ''
