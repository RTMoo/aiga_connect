from rest_framework_simplejwt.authentication import JWTAuthentication
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async
from urllib.parse import parse_qs
import logging

logger = logging.getLogger(__name__)


class JWTAuthMiddleware(BaseMiddleware):
    def __init__(self, inner):
        super().__init__(inner)
        self.auth = JWTAuthentication()

    @database_sync_to_async
    def get_user(self, token):
        try:
            validated_token = self.auth.get_validated_token(token)
            user = self.auth.get_user(validated_token)
            logger.info(f"User authenticated: {user.username}")
            return user
        except Exception as e:
            logger.error(f"Authentication error: {e}")
            return AnonymousUser()

    async def __call__(self, scope, receive, send):
        # Получаем токен из cookies
        headers = dict(scope.get("headers", []))
        cookies = headers.get(b"cookie", b"").decode()
        
        token = None
        for cookie in cookies.split("; "):
            if cookie.startswith("access_token="):
                token = cookie.split("=")[1]
                logger.info("Token found in cookies")
                break

        # Если токен не найден в cookies, ищем в URL параметрах
        if not token and scope.get("query_string"):
            query_string = scope.get("query_string").decode()
            query_params = parse_qs(query_string)
            token = query_params.get("token", [None])[0]
            if token:
                logger.info("Token found in URL parameters")

        if not token:
            logger.warning("No token found")

        scope["user"] = await self.get_user(token) if token else AnonymousUser()
        return await super().__call__(scope, receive, send)
