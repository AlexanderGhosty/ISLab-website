-- Создание базы данных
CREATE DATABASE IF NOT EXISTS islab_db;

-- Создание пользователя с доступом с любого хоста
CREATE USER IF NOT EXISTS 'islab_user'@'%' IDENTIFIED BY 'islab_pass';

-- Предоставление всех прав на базу данных
GRANT ALL PRIVILEGES ON islab_db.* TO 'islab_user'@'%';

-- Применение изменений
FLUSH PRIVILEGES;
