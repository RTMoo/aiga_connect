from typing import Any
from accounts.models import User
from shop.models import Product, Category
from shop import selectors
from rest_framework.exceptions import PermissionDenied, ValidationError
from django.db import IntegrityError


def create_product(sender: User, data: dict[str, Any]) -> Product:
    category = selectors.get_category(category_id=data.pop("category_id"))

    return Product.objects.create(author=sender, category=category, **data)


def edit_product(sender: User, product_id: int, data: dict[str, Any]) -> Product:
    product = selectors.get_product(product_id=product_id)
    category = selectors.get_category(category_id=data.pop("category_id"))

    if product.author != sender:
        raise PermissionDenied(detail="вы не можете редактировать чужой продукт")

    for key, value in data.items():
        setattr(product, key, value)

    product.category = category
    product.save()

    return product


def delete_product(sender: User, product_id: int) -> None:
    product = selectors.get_product(product_id=product_id)

    if product.author != sender and sender.role != User.RoleChoices.MODERATOR:
        raise PermissionDenied(detail="вы не можете удалить чужой продукт")

    product.delete()


def create_category(data: dict[str, Any]) -> Category:
    return Category.objects.create(**data)


def edit_category(category_id: int, data: dict[str, Any]) -> Category:
    category = selectors.get_category(category_id=data.pop("id"))

    category.name = data["name"]
    category.slug = data["slug"]

    try:
        category.save()
        return category
    except IntegrityError:
        raise ValidationError(
            detail=f"Категория с таким  slug={data['slug']} уже существует"
        )


def delete_category(category_id: int) -> None:
    category = selectors.get_category(category_id=category_id)

    category.delete()
