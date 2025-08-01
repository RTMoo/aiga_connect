from shop.models import Product, Category
from django.db.models import QuerySet
from rest_framework.exceptions import NotFound


def get_products_list() -> QuerySet[Product]:
    return Product.objects.all()


def get_product(product_id: int) -> Product:
    product = Product.objects.filter(id=product_id).first()

    if not product:
        raise NotFound(detail=f"Продукт с {product_id=} не найден")

    return product


def get_category(category_id: int) -> Category:
    category = Category.objects.filter(id=category_id).first()

    if not category:
        raise NotFound(detail=f"Категория с {category_id=} не найден")

    return category


def get_categories_list() -> QuerySet[Category]:
    return Category.objects.all()
