from rest_framework import serializers


class ProductSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=256)
    description = serializers.CharField(max_length=256)
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    quantity = serializers.IntegerField()
    category = serializers.CharField(source="category.slug", read_only=True)
    category_id = serializers.IntegerField(write_only=True)
    image = serializers.ImageField(required=False, allow_null=True)


class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=256)
    slug = serializers.SlugField(max_length=256)
