from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.request import Request
from rest_framework.permissions import IsAuthenticated
from commons.permissions import IsTrainer, IsModerator
from shop.serializers import ProductSerializer, CategorySerializer
from shop import services
from shop import selectors


class CreateProductView(APIView):
    permission_classes = [IsTrainer]
    serializer_class = ProductSerializer

    def post(self, request: Request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = services.create_product(
            sender=request.user, data=serializer.validated_data
        )
        data = self.serializer_class(instance=product).data

        return Response(data=data, status=status.HTTP_201_CREATED)


class GetProductsListView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer

    def get(self, request: Request):
        product = selectors.get_products_list()
        data = self.serializer_class(instance=product, many=True).data

        return Response(data=data, status=status.HTTP_200_OK)


class EditProductView(APIView):
    permission_classes = [IsTrainer]
    serializer_class = ProductSerializer

    def get(self, request: Request, product_id: int):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = services.edit_product(
            sender=request.user, product_id=product_id, data=serializer.validated_data
        )
        data = self.serializer_class(instance=product).data

        return Response(data=data, status=status.HTTP_200_OK)


class DeleteProductView(APIView):
    permission_classes = [IsTrainer]
    serializer_class = ProductSerializer

    def get(self, request: Request, product_id: int):
        services.delete_product(sender=request.user, product_id=product_id)

        return Response(status=status.HTTP_204_NO_CONTENT)


class GetProductDetailView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer

    def get(self, request: Request, product_id: int):
        product = selectors.get_product(product_id=product_id)
        data = self.serializer_class(instance=product).data

        return Response(data=data, status=status.HTTP_200_OK)


class CreateCategoryView(APIView):
    permission_classes = [IsModerator]
    serializer_class = CategorySerializer

    def post(self, request: Request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = services.create_category(data=serializer.validated_data)
        data = self.serializer_class(instance=product).data

        return Response(data=data, status=status.HTTP_201_CREATED)


class GetCategoriesListView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CategorySerializer

    def get(self, request: Request):
        product = selectors.get_categories_list()
        data = self.serializer_class(instance=product, many=True).data

        return Response(data=data, status=status.HTTP_200_OK)


class EditCategoryView(APIView):
    permission_classes = [IsModerator]
    serializer_class = CategorySerializer

    def get(self, request: Request, category_id: int):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        category = services.edit_category(
            category_id=category_id, data=serializer.validated_data
        )
        data = self.serializer_class(instance=category).data

        return Response(data=data, status=status.HTTP_200_OK)


class DeleteCategoryView(APIView):
    permission_classes = [IsModerator]
    serializer_class = CategorySerializer

    def get(self, request: Request, category_id: int):
        services.delete_category(category_id=category_id)

        return Response(status=status.HTTP_204_NO_CONTENT)
