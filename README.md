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


### Environment Variables Cliect
Create a `.env` file in the `hris-client` directory with the following content:
```plaintext
PORT=your-client-port-number
SERVER_URL=your-server-port-number
```

### Environment Variables Client
Create a `.env `file in the `hris-server` directory with the following content:
```plaintext
PORT=your-server-port-number
JWT_SECRET=your-jwt-secret
Firebase Configuration
In your Firebase project settings, find the following values and add them to your .env file in the `hris-server` directory:
plaintext
API_KEY=your-api-key
AUTH_DOMAIN=your-auth-domain
PROJECT_ID=your-project-id
STORAGE_BUCKET=your-storage-bucket
MESSAGING_SENDER_ID=your-messaging-sender-id
APP_ID=your-app-id
```

This Markdown format will render nicely on platforms like GitHub. Feel free to use and modify it as needed!