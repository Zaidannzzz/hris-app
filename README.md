# HRIS Application

## Setup Instructions

### Backend
1. Navigate to the `hris-server` directory: `cd hris-server`
2. Install dependencies: `npm install`
3. Run the backend server: `npm start`

### Frontend
1. Navigate to the `hris-client` directory: `cd hris-client`
2. Install dependencies: `npm install`
3. Run the frontend application: `npm start`

### Environment Variables
Create a `.env` file in the `hris-backend` directory with the following content:
PORT = your port number

JWT_SECRET="your-jwt-secret"

#FIREBASE
API_KEY = "your-api-key"
AUTH_DOMAIN = "your-auth-domain"
PROJECT_ID = "your-project-id"
STORAGE_BUCKET = "your-storage-bucket"
MESSAGING_SENDER_ID = "your messaging-sender-id"
APP_ID = "your-app-id"
