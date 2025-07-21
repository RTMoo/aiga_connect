from typing import Any
from commons.selectors import get_discipline
from accounts.selectors import get_user


def pop_and_resolve_fields(data: dict[str, Any]) -> dict[str, Any]:
    """Преобразует поля discipline_id и to_child в объекты и подставляет в словарь."""
    data = data.copy()

    if "discipline_id" in data:
        discipline_id = data.pop("discipline_id")
        data["discipline"] = get_discipline(discipline_id)

    if "to_child" in data:
        user_id = data.pop("to_child")
        data["to_child"] = get_user(user_id)

    return data


def update_model_instance(instance: Any, data: dict[str, Any]):
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()
    return instance
