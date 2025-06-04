# Лаборатории информационной безопасности · Московский Политех

Веб‑платформа для публикации новостей, научных работ, проектов и ресурсов Лабораторий информационной безопасности Московского политеха.
Проект построен на **Django** и **Django REST Framework** с одностраничным фронтендом на **Tailwind CSS** и **Vanilla JavaScript**.

---

## Содержание

* [Описание](#описание)
* [Возможности](#возможности)
* [Технологии](#технологии)
* [Установка](#установка)
* [Настройка окружения](#настройка-окружения)
* [Запуск в режиме разработки](#запуск-в-режиме-разработки)
* [Развертывание через Docker](#развертывание-через-docker)
* [API](#api)
* [Администрирование](#администрирование)
* [Тестирование](#тестирование)

---

## Описание

Сайт демонстрирует деятельность лаборатории: новости, публикации, текущие исследовательские проекты, список сотрудников и интерактивную форму обратной связи.
Бэк‑энд предоставляет [REST API](#api) для использования контента во внешних сервисах или мобильных приложениях.

## Возможности

| Модуль            | Описание                                                                               |
| ----------------- | -------------------------------------------------------------------------------------- |
| Новости           | Лента с пагинацией, детальная страница, фотогалерея                                    |
| Публикации        | База научных статей с возможностью скачивания PDF                                      |
| Сотрудники        | Карточки персонала с биографией, фотографией и контактами                              |
| Проекты           | Каталог исследовательских и коммерческих проектов                                      |
| API               | Открытый REST‑интерфейс (только чтение) для News, Publication, Staff, Project          |
| Админ‑панель      | Удобное управление контентом, inline‑галерея для изображений новостей                  |
| Контакт‑форма     | Отправка сообщений с валидацией на клиенте (не реализовано)                            |
| Адаптивный дизайн | Tailwind CSS обеспечивает корректное отображение на мобильных и десктопных устройствах |

## Технологии

* **Python 3.12**
* **Django 5.2** – MVC‑фреймворк
* **Django REST Framework** – сериализация и ViewSet API
* **MySQL 8.x** – СУБД по умолчанию
* **Tailwind CSS 3** – утилитарный CSS‑фреймворк
* **Font Awesome 6** – иконки
* **Vanilla JavaScript / Fetch API** – загрузка данных на фронтенде

> ⚡ *Build‑chain не требуется*: Tailwind подключён через CDN, а скрипты – обычные ES‑модули.

## Установка

```bash
# 1. Клонируем репозиторий
$ git clone https://github.com/<username>/infosec_lab_site.git
$ cd infosec_lab_site

# 2. Создаём и активируем виртуальное окружение
$ python -m venv venv
$ source venv/bin/activate  # Windows: venv\Scripts\activate

# 3. Ставим зависимости
$ pip install -r requirements.txt
```
В список зависимостей входит пакет `django-admin-interface`, обеспечивающий оформление панели администратора.

Создайте базу данных и пользователя MySQL:

```sql
CREATE DATABASE infosec_lab_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'infosec_user'@'localhost' IDENTIFIED BY '<пароль>';
GRANT ALL PRIVILEGES ON infosec_lab_db.* TO 'infosec_user'@'localhost';
FLUSH PRIVILEGES;
```

## Настройка окружения

Файл [`settings.py`](infosec_lab/settings.py) содержит базовые параметры.
**Никогда** не коммитьте секреты! В продакшене перенесите переменные в `.env` или переменные окружения.

```env
# .env (пример)
DJANGO_SECRET_KEY=ChangeMePlease
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=your.domain.com,127.0.0.1

MYSQL_NAME=infosec_lab_db
MYSQL_USER=infosec_user
MYSQL_PASSWORD=<пароль>
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
```

## Запуск в режиме разработки

```bash
# Миграции и суперпользователь
$ python manage.py migrate
$ python manage.py createsuperuser

# Запуск встроенного сервера
$ python manage.py runserver
```

Откройте: `http://127.0.0.1:8000/` – главная страница
`http://127.0.0.1:8000/api/` – browsable API
`http://127.0.0.1:8000/admin/` – панель администратора.

## Развертывание через Docker

Перед запуском убедитесь, что установлены [Docker](https://www.docker.com/) и [Docker Compose](https://docs.docker.com/compose/).

### 📁 Структура

* `Dockerfile` — инструкция сборки Django-приложения.
* `docker-compose.yml` — конфигурация сервиса `web` (Django) + `db` (MySQL).
* `.env` — переменные окружения (не коммить в публичный репозиторий).

### ⚙️ .env (пример)

```env
DJANGO_SECRET_KEY=ChangeMePlease
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=127.0.0.1,localhost

MYSQL_DATABASE=infosec_lab_db
MYSQL_USER=infosec_user
MYSQL_PASSWORD=infosec_pass
MYSQL_ROOT_PASSWORD=root_pass

DB_HOST=db
DB_PORT=3306
```

### 🚀 Сборка и запуск

```bash
# Сборка и запуск в фоне
$ docker-compose up --build -d

# Применение миграций
$ docker-compose exec web python manage.py migrate

# Создание суперпользователя
$ docker-compose exec web python manage.py createsuperuser

# Сбор статики
$ docker-compose exec web python manage.py collectstatic --noinput
```

### 🌐 Доступы

| Интерфейс | URL                                                          |
| --------- | ------------------------------------------------------------ |
| Главная   | [http://127.0.0.1:8000/](http://127.0.0.1:8000/)             |
| API       | [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)     |
| Админка   | [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/) |

### 🩹 Остановка и удаление контейнеров

```bash
$ docker-compose down -v
```

## API

| Эндпоинт                  | Метод | Описание                           | Пагинация      |
| ------------------------- | ----- | ---------------------------------- | -------------- |
| `/api/news/`              | GET   | Список новостей (page, page\_size) | ✔️             |
| `/api/news/{id}/`         | GET   | Детальная новость                  | ❄️             |
| `/api/publications/`      | GET   | Список публикаций                  | ✔️             |
| `/api/publications/{id}/` | GET   | Детальная публикация               | ❄️             |
| `/api/staff/`             | GET   | Список сотрудников                 | ❄️ (отключена) |
| `/api/staff/{id}/`        | GET   | Карточка сотрудника                | ❄️             |
| `/api/projects/`          | GET   | Список проектов                    | ✔️             |
| `/api/projects/{id}/`     | GET   | Детальный проект                   | ❄️             |

**Параметры пагинации** (DRF `PageNumberPagination`):

```json
{
  "count": 12,
  "next": "http://127.0.0.1:8000/api/news/?page=2",
  "previous": null,
  "results": [ ... ]
}
```

## Администрирование

* **Новости**: поддержка inline добавления до 20 изображений к одной записи.
* **Публикации**: поля *Название*, *Авторы*, *Журнал*, *Ссылка*.
* **Сотрудники**: фотография, контакты, краткая биография.
* **Проекты**: период выполнения, цель, результаты, заказчик.

### Настройка темы администратора

Панель управления оформлена с помощью [django-admin-interface](https://github.com/fabiocaccamo/django-admin-interface).
Приложения `admin_interface` и `colorfield` уже добавлены в `INSTALLED_APPS`, а заголовки панели задаются в [`ISLab/urls.py`](ISLab/urls.py).
При необходимости можно изменить шаблон `templates/admin/base_site.html` и стили `static/css/admin_custom.css`.

## Тестирование

```bash
$ python manage.py test
```
