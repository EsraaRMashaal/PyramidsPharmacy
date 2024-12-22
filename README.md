# Pyramids Pharmacy

Pyramids Pharmacy is a Django-based web application designed to manage medications and refill requests. The application uses Django REST framework for the API and PostgreSQL as the database.

## Features

- User authentication with JWT
- Medication management
- Refill request management
- Filtering, searching, and ordering of medications and refill requests

## Prerequisites

- Docker
- Docker Compose
- Python 3.8+
- PostgreSQL

## Setup

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/pyramidspharmacy.git
cd pyramidspharmacy
```

### 2. Create a `.env` file

Create a `.env` file in the root directory of the project and add the following environment variables:

```sh

DEBUG=True
DB_NAME=pyramids-pharmacy
DB_USER=postgres
DB_PASSWORD=postgre_2023
DB_HOST=host.docker.internal
DB_PORT=5432
```

### 3. Build the Docker containers

```sh
docker-compose build
```

### 4. Run the Docker containers

```sh
docker-compose up
```

### 5. Apply Database Migrations
```sh
docker-compose exec web python manage.py migrate
```


## Usage

### API Endpoints





