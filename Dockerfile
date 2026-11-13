FROM php:8.2-apache

RUN a2enmod rewrite \
    && docker-php-ext-install pdo pdo_mysql

RUN sed -i 's/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf

COPY api/ /var/www/html/api/
COPY front/ /var/www/html/front/
COPY .htaccess /var/www/html/.htaccess
