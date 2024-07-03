Инструкция по установке и запуску

1) Склонировать проект git clone https://github.com/Leladatan/fullstack-admin-panel.git.
2) Создать БД Postgres (например, `test-bd`).
3) Запустить в любой ide проект. Открыть два терминала, в одном будет запущен сервер, в другом клинет.
4) В первом терминале вводим ```bash cd .\backend\ ``` - переходим в данную директорию, далее вводим в командную строку ```basg yarn ``` - для установки всех необходимых пакетов.
5) Создаем .env файл в корне backend директории и вводим: DATABASE_URL=postgresql://login:password@localhost:5432/db-name?schema=public. Мой пример: DATABASE_URL=postgresql://postgres:123123@localhost:5432/test-bd?schema=public.
6) В командной строке записываем yarn db:seed, данный скрипт создаст 10 пользователей и 50 публикаций. Далее запускаем сервер yarn start:dev. (Сервер поднимается на 4000 порту)
7) Во втором терминале вводим cd .\frontend\ - переходим в данную директорию, далее вводим в командную строку yarn - для установки всех необходимых пакетов. (Аналогично пункту 3)
8) Создаем .env файл в корне frontend директории и вводим VITE_API_URL=http://localhost:4000.
9) Запускаем клиент командой yarn dev. (Клиент поднимается на 3000 порту)
