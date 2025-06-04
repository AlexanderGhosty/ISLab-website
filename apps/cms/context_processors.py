from .models import TextBlock


def textblocks(request):
    return {"textblocks": {block.key: block.content for block in TextBlock.objects.all()}}
