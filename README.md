# LinkTree Backend

Welcome to the LinkTree Backend repository! This project serves as the backend for a LinkTree-like application, allowing users to manage and share multiple links through a single profile.

## Features

- **User Authentication**: Secure user registration and login.
- **Link Management**: Add, edit, and delete links.
- **Profile Customization**: Personalize your profile with custom themes and settings.
- **API Documentation**: Interactive API documentation with Swagger.

## Technologies Used

- **Backend Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger
- **Environment Variables**: dotenv
- **CORS**: Configurable CORS settings

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/CarlesVicedo/linktree-backend.git
   cd linktree-backend
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   ```sh
   cp .env.example .env
   ```
   Update the .env file with your configuration.

4. Start the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

## API Documentation

The API documentation is available at `/doc` when the server is running. You can access it by navigating to [http://localhost:4000/doc](http://localhost:4000/doc) in your browser. If you need to check it out befor starting the local server you can have a look at the deployed version [https://linktree-backend-5wjw.onrender.com/doc/](https://linktree-backend-5wjw.onrender.com/doc/)

## Postman Collection

You can import the Postman collection from the `postman_collection.json` file for easy testing. The collection includes all the endpoints and example requests.

## Project Structure

```plaintext
├── src
│   ├── config
│   │   ├── cors.ts
│   │   ├── db.ts
│   ├── controllers
│   │   ├── userController.ts
│   ├── middleware
│   │   ├── authenticate.ts
│   │   ├── handleInputErrors.ts
│   ├── models
│   │   ├── User.ts
│   ├── routes
│   │   ├── router.ts
│   ├── server.ts
├── swagger.json
├── postman_collection.json
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Acknowledgements

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Swagger](https://swagger.io/)
- [dotenv](https://github.com/motdotla/dotenv)
- [JWT](https://jwt.io/)