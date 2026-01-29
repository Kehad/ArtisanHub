# ArtisanHub

ArtisanHub is a comprehensive mobile platform designed to empower artisans by providing tools for business management, portfolio showcasing, job connection, and skills training.

## Features

- **User Authentication**: Secure Login and Sign Up functionality.
- **Dashboard**: Centralized hub for accessing various tools and services.
  - **Business Suite**: Tools to manage artisan business operations.
  - **Digital Tools**: Access to digital resources.
  - **Job Connect**: Browse and apply for job opportunities.
  - **Skills Training**: Access training modules and resources.
- **Portfolio Management**: Showcase work through a digital portfolio.
- **Real-time Chat**: Communication features using Socket.io.
- **Analytics**: insights and performance metrics.

## Tech Stack

### Frontend
- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (via [NativeWind](https://www.nativewind.dev/))
- **Navigation**: [React Navigation](https://reactnavigation.org/)
- **State/Networking**: Axios, React Hooks

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose)
- **Authentication**: JWT (JSON Web Tokens) & bcryptjs
- **Real-time**: [Socket.io](https://socket.io/)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo Go app on your mobile device (iOS/Android) or an Emulator

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Agritech
```

### 2. Backend Setup
Navigate to the backend directory, install dependencies, and start the server.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with your configuration (e.g., MONGODB_URI, JWT_SECRET, PORT).

```bash
# Start the backend server
npm start
# OR for development (with nodemon)
npm run dev
```
The backend typically runs on `http://localhost:5000` (check `index.js` or logs).

### 3. Frontend Setup
Navigate to the frontend directory, install dependencies, and start the Expo app.

```bash
cd ../frontend
npm install
npm start
```

This command will start the Metro bundler. You can:
- Scan the QR code with the **Expo Go** app on your phone.
- Press `a` to run on an Android Emulator.
- Press `i` to run on an iOS Simulator.
- Press `w` to run in the web browser.

## Project Structure

```
Agritech/
├── backend/          # Node.js/Express API and Database logic
│   ├── controllers/  # Request handlers
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API routes
│   └── index.js      # Entry point
│
├── frontend/         # React Native Expo App
│   ├── src/
│   │   ├── api/      # API integration
│   │   ├── components/ # Reusable UI components
│   │   ├── screens/  # Application screens (Dashboard, Profile, etc.)
│   │   ├── navigation/ # Navigation configuration
│   │   └── context/  # React Context (Global State)
│   └── App.tsx       # Main Entry point
│
└── README.md         # Project Documentation
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
