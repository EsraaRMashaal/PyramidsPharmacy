# Pyramids Pharmacy Management System

## Overview

Pyramids Pharmacy Management System is a web application designed to streamline the management of pharmacy operations. The platform includes features such as medication management, refill requests, and user role-based functionalities to ensure efficient and secure operations.

## Features

1. **Authentication**

   - Register: Allows users to create an account.
   - Login: Enables users to securely log into the system.

2. **Dashboard**

   - Provides a summary of key statistics:
     - All Medications: Displays the total count of medications available in the system.
     - Pending Requests: Shows the number of refill requests awaiting approval.
     - Approved Requests: Can approve the number of refill requests that have been approved [planned for future versions to manage by higher-role users]
     - Rejected Requests: Can reject the number of refill requests that have been rejected [planned for future versions to manage by higher-role users]

3. **Medications Module**

   - Add New Medication: Users can add new medications to the system.
   - List All Medications: View a comprehensive list of all medications.

4. **Medications Refills**

    - Add Refill Request: Users can submit a refill request for medications.
    - List All Requests: View all submitted refill requests.
    - Verify Request: Allows a higher-role user to verify refill requests (planned for future versions).
    - Reject Request: Enables a higher-role user to reject refill requests (planned for future versions).

## Future Enhancements

- Role-based access control to handle verification and rejection of refill requests.
- Improved analytics and reporting on medication usage and refill trends.
- Integration with third-party APIs for inventory management and supply chain optimization.

## Prerequisites

- Docker
- Docker Compose

## Technologies Used

- Django REST Framework
- React
- PostgreSQL
- Docker
- Docker Compose
- ApexCharts
- Tailwind CSS
- Vite
- Axios

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

## Postman Collection can be found [here](https://galactic-rocket-649595.postman.co/workspace/My-Workspace~02bfb526-da9a-4ab4-8734-dbc4f8fede12/collection/24728437-0998060a-89af-4167-acde-6fd57e6e7a11?action=share&creator=24728437)


## Contributing

Contributions are welcome! please feel free to submit a Pull Request. 

## Authors

**Esraa Raffik Mashaal**  
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-blue?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/esraamashaal/) 
[![GitHub](https://img.shields.io/badge/-GitHub-black?style=flat&logo=github&logoColor=white)](https://github.com/EsraaRMashaal) 
[![Gmail](https://img.shields.io/badge/-Gmail-c14438?style=flat&logo=gmail&logoColor=white)](mailto:esraa.mashaal96@gmail.com)

📫 How to reach me:

📞 +20 1013589988  📍 Egypt  ✉️ esraa.mashaal96@gmail.com

