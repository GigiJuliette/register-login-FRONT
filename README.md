# Strateg.In test techniques - Frontend

React web application with user authentication, profile management and interactive interface.

## Table of Contents

- [Tech Stack](#Tech-Stack)
- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [API Services](#api-services)
- [Context Provider](#context-provider)
- [Security](#security)
- [Deployment](#deployment)

- [Backend Repository](https://github.com/GigiJuliette/register-login-API) - Node.js/Express API

## Tech Stack

- **React 19.2**
- **TypeScript**
- **Vite**
- **React Router**
- **CSS3**

## Features

### Authentication

- **Registration**: Account creation with nickname, email and password
- **Login**: JWT token authentication
- **Logout**: Token removal and redirection

### Profile Management

- Edit nickname, name, surname, bio, email
- Profile icon selection.

## Routes

- `/` - Landing page
- `/authentication` - Login/registration page
- `/dashboard` - Dashboard (protected)
- `/*` - 404 page (not found routes)

## API Services

The [api.ts](src/services/api.ts) file exposes the following services:

```typescript
userService.register(userData); // Registration
userService.getToken(userData); // Login
userService.getMyUser(); // Get profile
userService.getAllUsers(); // List users
userService.updateProfile(data); // Update profile
```

All authenticated calls use the JWT token stored in `localStorage`.

# Installation

- Node.js (version 18 or higher)
- npm or yarn

```bash
git clone git@github.com:GigiJuliette/register-login-FRONT.git
```

```bash
cd register-login-FRONT
```

```bash
npm install
```

```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Auth/           # Login & Register
│   ├── Background/     # SVG Background
│   ├── EditProfile/    # Profile editing
│   ├── EditProfileIcon/ # Icon selection
│   ├── Glassmorphism/  # SVG Glassmorphism effect
│   ├── IconProfile/    # Profile icon display
│   ├── LogOut/         # Logout
│   └── UsersList/      # Users list
├── context/            # Context API
│   └── userProvider.tsx # Global user state
├── pages/              # Application pages
│   ├── AuthPage/       # Authentication page
│   ├── Dashboard/      # Dashboard
│   ├── Error/          # 404 page
│   └── Landing/        # Landing page
├── services/           # API services
│   └── api.ts          # API calls
├── utils/              # Utilities
│   └── useMousePosition.tsx # Mouse position hook
├── App.tsx             # Main component
└── main.tsx            # Entry point
```

## Context Provider

The [UserProvider](src/context/userProvider.tsx) manages global state:

- `user`: Current user data
- `setUser`: Update data
- `fetchUser`: Reload profile
- `loading`: Loading state

## Security

- JWT tokens for authentication
- API error validation
- Automatic redirection if not authenticated
- Error handling with explicit messages

## Deployment

Vercel [authclient.gi-gi.dev](https://authclient.gi-gi.dev/):
