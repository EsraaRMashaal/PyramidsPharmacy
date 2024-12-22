# Pyramids Pharmacy

This project is a web application for Pyramids Pharmacy, built with Django for the backend and React for the frontend. The application uses PostgreSQL as the database.

## Prerequisites

- Docker
- Docker Compose

## Installation

Follow these steps to set up and run the project:

### 1. Clone the Repository

```sh
git clone https://github.com/EsraaRMashaal/PyramidsPharmacy.git
cd PyramidsPharmacy
```

### 2. Set Up the Environment Variables

Create a `.env` file in the root directory and add the following environment variables
    
```sh   

    DEBUG=True
    DB_NAME=pyramids-pharmacy
    DB_USER=postgres
    DB_PASSWORD=postgre_2023
    DB_HOST=host.docker.internal
    DB_PORT=5432

    VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

### 3. Build and Run the Docker Containers
    
```sh
docker-compose up --build
```

### 4. Access the Application in Your Browser

- Frontend: Open your web browser and navigate to http://localhost:5173/.
- Backend: Open your web browser and navigate to http://localhost:8000/.

### 5. Stopping the Containers (If Needed)

```sh
docker-compose down
```
## Project Structure

The project structure is organized as follows:

```plaintext
PyramidsPharmacy/
├── pyramidspharmacy/         # Django backend application
├── frontend/                 # React frontend application
├── docker-compose.yaml       # Docker Compose configuration file
├── Dockerfile                # Dockerfile for both frontend and backend services
└── .env                      # Environment variables file (not included in the repository, needs to be created)
```

## Contributing

Contributions are welcome! please feel free to submit a Pull Request. 

## Authors

**Esraa Raffik Mashaal**  
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/esraamashaal/) 
[![GitHub](https://img.shields.io/badge/-GitHub-black?style=flat&logo=github&logoColor=white)](https://github.com/EsraaRMashaal) 
[![Gmail](https://img.shields.io/badge/-Gmail-c14438?style=flat&logo=gmail&logoColor=white)](mailto:esraa.mashaal96@gmail.com)

📫 How to reach me:

📞 +20 1013589988  📍 Egypt  ✉️ esraa.mashaal96@gmail.com
