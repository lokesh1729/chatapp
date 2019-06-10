from django.conf import settings
from django.urls import include, path, re_path
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.views import defaults as default_views

from rest_framework.routers import DefaultRouter
from chatapp.users.views import AuthRegisterView, AuthDetailsView, AuthLoginView


router = DefaultRouter(trailing_slash=False)


urlpatterns = [
    path("", TemplateView.as_view(template_name="pages/home.html"), name="home"),
    re_path(
        r"^app/(?P<route>.*)$",
        TemplateView.as_view(template_name="index.html"),
        name="app",
    ),
    path("api/", include(router.urls)),
    path(
        "about/", TemplateView.as_view(template_name="pages/about.html"), name="about"
    ),
    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    # User management
    path("users/", include("chatapp.users.urls", namespace="users")),
    path("accounts/", include("allauth.urls")),
    path("api/auth/login/", AuthLoginView.as_view(), name="auth_login"),
    path("api/auth/register/", AuthRegisterView.as_view(), name="auth_register"),
    path("api/auth/details/", AuthDetailsView.as_view(), name="auth_details"),
    path(
        "api/auth/", include(("knox.urls", "knox"), namespace="api_auth"), name="api_auth"
    ),
    # Your stuff: custom urls includes go here
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
