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
JWT_SECRET=your_jwt_secret
DATABASE_URL=sqlite:./database.sqlite
