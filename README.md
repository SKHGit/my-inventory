# My Inventory

My Inventory is a web application for managing shop inventory. It allows users to track products, record sales and purchases, and view reports.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Docker and Docker Compose installed on your machine.

*   [Docker](https://docs.docker.com/get-docker/)
*   [Docker Compose](https://docs.docker.com/compose/install/)

## Build and Run

To build and run the application, follow these steps:

1.  Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```sh
    cd my-inventory
    ```
3.  Run the following command to build and start the containers:
    ```sh
    docker-compose up --build
    ```

This will start the frontend, backend, and database services.

## Accessing the Application

Once the containers are running, you can access the application in your web browser at the following URL:

[http://localhost:3000](http://localhost:3000)

## Technology Stack

*   **Frontend:** React, Vite, Tailwind CSS
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB
*   **Containerization:** Docker, Docker Compose

## Project Architecture

The project follows a classic client-server architecture, containerized with Docker for easy setup and deployment.

*   **Frontend:** A single-page application (SPA) built with React. It provides the user interface and communicates with the backend via RESTful API calls. The frontend is served by a Vite development server inside a Docker container.

*   **Backend:** A Node.js and Express.js server that exposes a REST API. It handles business logic, data processing, and communication with the database. It runs in its own Docker container.

*   **Database:** A MongoDB instance that serves as the database for the application. It stores all the data, including products, sales, and purchases. It runs in a separate Docker container, and its data is persisted using a Docker volume.

The services are orchestrated using `docker-compose`, which defines how the three containers (frontend, backend, and database) are networked and run together.
