from django.urls import path
from .views import (
    RegisterUser, LoginUser, search_jobs, account_details,
    account_update, upload_cv, check_cv, get_saved_recommendations, 
    get_more_recommendations
)
from .api_views import get_recommendations

urlpatterns = [
    path('api/register/', RegisterUser.as_view(), name='register'),
    path('login/', LoginUser.as_view(), name='login'),
    path('search_jobs/', search_jobs, name='search_jobs'),
    path('api/account_details/', account_details, name='account_details'),
    path('api/account/update/', account_update, name='account_update'),
    path('api/upload-cv/', upload_cv, name='upload_cv'),
    path('api/check-cv/', check_cv, name='check_cv'),
    path('api/get-recommendations/', get_saved_recommendations, name='get_saved_recommendations'),  # ✅ Fixed this!
    path('recommendations/<str:username>/', get_recommendations, name='get_recommendations'),
    path('api/get-more-recommendations/', get_more_recommendations, name='get_more_recommendations'),

]
