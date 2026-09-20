# Advanced Microservices Architecture

A modern, scalable microservices architecture built with Node.js, Express, MongoDB, RabbitMQ, and OpenTelemetry. 

This repository currently features an **Auth Service** and a **Profile Service** with integrated distributed tracing, messaging, and containerized deployment. 

The Profile Service consumes events from the Auth Service to manage user profiles automatically.

---

## 🚀 Features

- **Authentication Service**: User registration and login functionality using JWT.
- **Profile Service**: Handles user profiles and listens for user creation events to automate profile setups.
- **Message Broker**: Event-driven architecture utilizing **RabbitMQ** (e.g., publishing `user_events` upon registration).
- **Database**: **MongoDB** for robust data persistence.
- **Distributed Tracing**: Built-in observability with **OpenTelemetry** and **Jaeger**.
- **Containerized**: fully reproducible environment using **Docker** and **Docker Compose**.

---

## 📁 Repository Structure

```text
.
├── auth-service/
│   ├── src/
│   │   ├── config/       # Database & RabbitMQ connection setups
│   │   ├── controllers/  # API business logic (e.g., AuthController)
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # Express route definitions
│   │   └── app.js        # Express app configuration
│   ├── .env.example      # Environment variables template
│   ├── Dockerfile        # Container build instructions for Auth Service
│   ├── server.js         # Entry point for Auth Service
│   ├── tracing.js        # OpenTelemetry instrumentation initialization
│   └── package.json      # Node dependencies and scripts
├── profile-service/      # Service for user profile management
├── docker-compose.yml    # Multi-container orchestration (Mongo, RabbitMQ, Jaeger, Auth)
└── README.md             # This documentation
```

---

## 🛠️ Tech Stack

- **Backend Framework**: Node.js & Express
- **Database**: MongoDB & Mongoose
- **Message Broker**: RabbitMQ
- **Observability**: OpenTelemetry & Jaeger
- **Infrastructure**: Docker & Docker Compose

---

## ⚙️ Prerequisites

Before getting started, ensure you have the following installed on your machine:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (optional, if you want to run services locally without Docker)

---

## 🚦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/advanced-microservices.git
cd advanced-microservices
```

### 2. Configure Environment Variables
Navigate to the `auth-service` directory and configure your `.env` file (if not already set up):

```bash
# auth-service/.env
MONGO_URI=mongodb://mongo:27017/auth-service
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
OTEL_SERVICE_NAME=auth-service
```

### 3. Spin up the infrastructure
Use Docker Compose to build the application and start all services, including infrastructure dependencies:

```bash
docker-compose up --build
```

This command starts:
- **MongoDB** on `localhost:27017`
- **RabbitMQ** on `localhost:5672` (Management UI on `localhost:15672`)
- **Jaeger** (Tracing UI on `localhost:16686`)
- **Auth Service** on `localhost:5001`
- **Profile Service** on `localhost:5002`

---

## 🌐 Services and Ports

| Service            | Description                                  | URL / Port                    |
|--------------------|----------------------------------------------|-------------------------------|
| **Auth Service**   | API Gateway for User Registration/Login      | `http://localhost:5001`       |
| **Profile Service**| User Profile Management                      | `http://localhost:5002`       |
| **MongoDB**        | NoSQL Database                               | `localhost:27017`             |
| **RabbitMQ Admin** | Message Broker Management Dashboard          | `http://localhost:15672`      |
| **Jaeger UI**      | Distributed Tracing Dashboard                | `http://localhost:16686`      |

---

## 📡 API Endpoints (Auth Service)

### `POST /api/auth/register`
Creates a new user and publishes a `user_registered` event to RabbitMQ.

**Payload:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "userId": "64b1f...a3e"
}
```

---

## 📊 Observability & Tracing

The Auth Service comes pre-configured with **OpenTelemetry** auto-instrumentation, exporting trace data to Jaeger.

To view traces (e.g., database calls, HTTP requests, RabbitMQ messaging):
1. Make an API request (e.g., register a user).
2. Open the Jaeger UI at [http://localhost:16686](http://localhost:16686).
3. Select `auth-service` from the Service dropdown and click **Find Traces**.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.
