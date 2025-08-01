from django.db.models import Model


def sort_models(data: list[Model]) -> list[Model]:
    """
    Сортирует список моделей по их первичному ключу.

    Args:
        data (List[Model]): Список моделей для сортировки.

    Returns:
        List[Model]: Отсортированный список моделей.
    """

    return sorted(data, key=lambda x: x.pk)
