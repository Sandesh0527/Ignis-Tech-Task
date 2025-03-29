from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
from .models import Listing
from .serializers import ListingSerializer

class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

    @action(detail=False, methods=['GET'])
    def search(self, request):
        location = request.query_params.get('location', '')
        check_in = request.query_params.get('check_in')
        check_out = request.query_params.get('check_out')
        guests = request.query_params.get('guests')
        min_price = request.query_params.get('min_price')
        max_price = request.query_params.get('max_price')
        min_rating = request.query_params.get('min_rating')

        queryset = self.queryset

        if location:
            queryset = queryset.filter(
                Q(location__icontains=location) | 
                Q(address__icontains=location)
            )

        if min_price:
            queryset = queryset.filter(price_per_night__gte=min_price)

        if max_price:
            queryset = queryset.filter(price_per_night__lte=max_price)

        if min_rating:
            queryset = queryset.filter(ratings__gte=min_rating)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)