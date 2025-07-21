from commons.models import Discipline
from rest_framework.exceptions import NotFound


def get_discipline(discipline_id: int) -> Discipline:
    discipline = Discipline.objects.filter(id=discipline_id).first()

    if not discipline:
        raise NotFound(detail="Дисциплина не найдена")

    return discipline
