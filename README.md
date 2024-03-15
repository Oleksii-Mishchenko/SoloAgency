# SoloAgency

### [Repository](https://github.com/Oleksii-Mishchenko/SoloAgency.git)

### [Figma Design](https://www.figma.com/file/RYIfYMT2MNqeLg9wSi4aS3/Solo-Agency)


The "Solo Agency" project combines the latest web development technologies, 
utilizing Django REST Framework (DRF) to create a powerful API and React for building 
dynamic client interfaces. Each aspect of the project is meticulously 
crafted by a professional designer, ensuring convenience and aesthetic 
appeal of the user experience. Testers have conducted thorough testing 
of the system to guarantee its reliability, stability, and security. 
DRF provides advanced capabilities for automating API creation, 
including automatic conversion of Django models into serializers and request processing. 
React, in turn, enables the creation of interactive interfaces with high speed and reactivity. 
The project features a carefully designed structure that includes various functionalities 
for event agency management, including service management, event organization, portfolio, 
advice, reviews, and other aspects. It is created with consideration for the needs of the modern user, 
providing a convenient and intuitive interface for maximum user comfort.
Telegram notifications are configured.


## Content
- [technologies](#technologies)
- [documentation](#documentation)
- [using](#using)
- [get access](#using)
- [docker](#docker)
- [project developers](#project-developers)

## Technologies
- [Python](https://www.python.org/)
- [Django](https://www.djangoproject.com/)
- [Django-Rest-Framework](https://www.django-rest-framework.org/)
- [Swagger](https://swagger.io/)
- [Docker](https://www.docker.com/)
- [Sass](https://sass-lang.com/)
- [Vite](https://vitejs.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/), [React Router](https://reactrouter.com/en/main)
- [Redux Toolkit](https://redux-toolkit.js.org/), [Redux Persist](https://github.com/rt2zz/redux-persist)
- [Axios](https://axios-http.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)

## Documentation
http://127.0.0.1:8000/api/doc/swagger/

http://127.0.0.1:8000/api/doc/redoc/

## Using
Clone the repository from GitHub:
```sh
$ git clone https://github.com/Oleksii-Mishchenko/SoloAgency.git
```
Once you've cloned the repository, navigate into the repository.

Create a virtual environment and activate it using the following commands:
```sh
$ python3 -m venv venv
$ source venv/bin/activate
```

In directory backend create file ".env" with the following content:
```python
SECRET_KEY=SECRET_KEY
POSTGRES_HOST=POSTGRES_HOST
POSTGRES_DB=POSTGRES_DB
POSTGRES_USER=POSTGRES_USER
POSTGRES_PASSWORD=POSTGRES_PASSWORD
TELEGRAM_BOT_TOKEN=TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID=TELEGRAM_CHAT_ID
EMAIL_BACKEND=EMAIL_BACKEND
EMAIL_HOST=EMAIL_HOST
EMAIL_PORT=EMAIL_HOST
EMAIL_USE_TLS=EMAIL_USE_TLS
EMAIL_HOST_USER=EMAIL_HOST_USER
EMAIL_HOST_PASSWORD=EMAIL_HOST_PASSWORD
DEFAULT_FROM_EMAIL=DEFAULT_FROM_EMAIL
```
SoloAgency/backend$ :
Backend:

```sh
$ pip install -r requirements.txt
```

```sh
$ python3 manage.py migrate
```

```sh
$ python3 manage.py runserver
```

SoloAgency/frontend$ :
Frontend:


```sh
$ npm install
```

```sh
$ npm run dev
```

Go to the web browser and enter http://localhost:3000/SoloAgency/#/


## Docker
In directory backend create file ".env" with the following content:
```python
SECRET_KEY=SECRET_KEY
POSTGRES_HOST=POSTGRES_HOST
POSTGRES_DB=POSTGRES_DB
POSTGRES_USER=POSTGRES_USER
POSTGRES_PASSWORD=POSTGRES_PASSWORD
TELEGRAM_BOT_TOKEN=TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID=TELEGRAM_CHAT_ID
EMAIL_BACKEND=EMAIL_BACKEND
EMAIL_HOST=EMAIL_HOST
EMAIL_PORT=EMAIL_HOST
EMAIL_USE_TLS=EMAIL_USE_TLS
EMAIL_HOST_USER=EMAIL_HOST_USER
EMAIL_HOST_PASSWORD=EMAIL_HOST_PASSWORD
DEFAULT_FROM_EMAIL=DEFAULT_FROM_EMAIL
```
After that create the file "docker-compose.yml"
```python
version: "3.4"

services:
  backend:
    image: savik1992/soloagency-backend:latest
    ports:
      - "8080:8080"
    command: sh -c "python manage.py migrate && python manage.py runserver 0.0.0.0:8080"
    env_file:
      - backend/.env
    depends_on:
      - db
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U habrpguser -d habrdb"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s

  frontend:
    image: savik1992/soloagency-frontend:latest
    ports:
      - "3000:3000"
    depends_on:
      - backend

  db:
    image: postgres:14-alpine
    env_file:
      - backend/.env
```
After create directory backend with file .env as in example.

Then open your terminal and navigate to the directory you wish to store the project and run the following commands:
```sh
$ docker-compose up
```
Welcome, the application is ready to use at url http://localhost:3000/SoloAgency/#/

## Project developers

- [Taras Savchyn](https://www.linkedin.com/in/taras-savchyn-ba2705261/) — Python Developer
- [Oleksii Mishchenko](https://www.linkedin.com/in/oleksii-mishchenko-1b1158246/) — Frontend Developer
- [Tetiana Melnychuk](https://www.linkedin.com/in/tetiana-melnychuk-51b8a3278/) — UI/UX Designer
- [Ekateryna Shabunina](https://www.linkedin.com/in/ekateryna-shabunina-02732b256/) — QA Engineer

