
# LinkHub

LinkHub is a full-stack web application created using the MERN (MongoDB, Express, React, Node.js) stack. It enables users to create personalized linktrees or personal pages, offering a platform to manage and share links very effectively.
- Visit our website: [LinkHub](https://linkhub-frontend-deploy.vercel.app/)

- Demo Hub view: [Hub view](https://linkhub-frontend-deploy.vercel.app/shortview/lvu3d80y)

- Demo Page view: [Page view](https://linkhub-frontend-deploy.vercel.app/pageview/lvu3d80y) (only in Desktop mode)



![LinkHub Logo](./show_images/logo-white.png)
## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Views](#views)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

LinkHub is a platform that allows you to share your links with the world. You can share your social media profiles, websites, blogs, and much more with just one link. Create your free account today!.LinkHub allows users to create personalized pages to manage and share links. It includes user authentication, password reset functionality, and a user-friendly interface for managing links.

## Features

- Secure user authentication and authorization using JWT (JSON Web Tokens)
- Password reset functionality with email verification using Nodemailer
- User-friendly interface to create and manage personalized linktrees or personal pages
- Responsive design for optimal viewing on different devices


## views 
- HOME page
 ![Screenshot](/show_images/Screenshot%202024-05-22%20174334.png)
- SignUp Page
 ![Screenshot](/show_images/Screenshot%202024-05-22%20174359.png)
- SignIn Page
 ![Screenshot](/show_images/Screenshot%202024-05-22%20174439.png)
- DashBoard Page
  ![Screenshot](/show_images/Screenshot%202024-05-22%20174454.png)
  
  ![Screenshot](/show_images/Screenshot%202024-05-22%20174654.png)
- Profile Page
  ![Screenshot](/show_images/Screenshot%202024-05-22%20174524.png)
- Create Page
 ![Screenshot](/show_images/Screenshot%202024-05-22%20174617.png)
 ![Screenshot](/show_images/Screenshot%202024-05-22%20174630.png)
- Short_View Page
 ![Screenshot](/show_images/Screenshot%202024-05-22%20174731.png)
 ![Screenshot](/show_images/Screenshot%202024-05-22%20174752.png)
- Page_View page
 ![Screenshot](/show_images/Screenshot%202024-05-22%20174813.png)
 ![Screenshot](/show_images/Screenshot%202024-05-22%20175129.png)
- Forgot_password Page
 ![Screenshot](/show_images/Screenshot%202024-05-22%20175304.png)
- Email
 ![Screenshot](/show_images/Screenshot%202024-05-22%20175330.png)
- Reset Password page
 ![Screenshot](/show_images/Screenshot%202024-05-22%20175345.png)
## Technologies Used

- **Frontend:**
  - React
  - CSS
  - HTML

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JWT (JSON Web Tokens)
  - Nodemailer

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/vishalverma9572/LinkHub.git
   cd LinkHub
   ```

2. **Install dependencies:**

   - Backend:

     ```bash
     cd Backend
     npm install
     ```

   - Frontend:

     ```bash
     cd ../frontend
     npm install
     ```

## Usage

1. **Start the backend server:**

   ```bash
   cd Backend
   npm start
   ```

   This will start the backend server on `http://localhost:4500`.

2. **Start the frontend server:**

   ```bash
   cd ../frontend
   npm start
   ```

   This will start the frontend development server on `http://localhost:3000`.

## Project Structure

```plaintext
LinkHub/
├── Backend/
│   ├── Authenticate/
│   ├── database/
│   ├── node_modules/
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── Backend.md
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── images/
│   │   ├── pages/
│   │   ├── scripts/
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
├── .gitignore
└── Readme.md
```

## API Endpoints

### Authentication and User Management

- **Register a new user**
  - **Endpoint:** `POST /register`
  - **Request Body:** `{ "name": "string", "email": "string", "password": "string" }`
  - **Description:** Registers a new user and sends a welcome email.

- **Login user**
  - **Endpoint:** `POST /login`
  - **Request Body:** `{ "email": "string", "password": "string" }`
  - **Description:** Authenticates a user and returns a JWT token.

- **Forgot password**
  - **Endpoint:** `POST /forgot-password`
  - **Request Body:** `{ "email": "string" }`
  - **Description:** Sends a password reset link to the user's email.

- **Reset password**
  - **Endpoint:** `POST /reset-password/:token`
  - **Request Body:** `{ "newPassword": "string" }`
  - **Description:** Resets the user's password using the reset token.

### Link Management

- **View a link**
  - **Endpoint:** `GET /view-link/:linkId`
  - **Description:** Fetches the details of a specific link by its ID.

- **Get a link (Authenticated)**
  - **Endpoint:** `GET /get-link/:linkId`
  - **Description:** Fetches the details of a specific link by its ID for authenticated users.

- **Create a new link (Authenticated)**
  - **Endpoint:** `POST /create-link`
  - **Request Body:** `{ "title": "string", "url": "string", ... }`
  - **Description:** Creates a new link for the authenticated user.

- **Update a link (Authenticated)**
  - **Endpoint:** `PUT /update-link`
  - **Request Body:** `{ "linkId": "string", "title": "string", "url": "string", ... }`
  - **Description:** Updates an existing link for the authenticated user.

- **Delete a link (Authenticated)**
  - **Endpoint:** `DELETE /delete-link/:linkId`
  - **Description:** Deletes a specific link by its ID for the authenticated user.

- **Publish a link (Authenticated)**
  - **Endpoint:** `PUT /publish-link/:linkId`
  - **Description:** Publishes a specific link by its ID for the authenticated user.

- **Unpublish a link (Authenticated)**
  - **Endpoint:** `PUT /unpublish-link/:linkId`
  - **Description:** Unpublishes a specific link by its ID for the authenticated user.

### Secure Routes

- **Get user dashboard (Authenticated)**
  - **Endpoint:** `GET /dashboard`
  - **Description:** Fetches the dashboard data for the authenticated user.

- **Update password (Authenticated)**
  - **Endpoint:** `PUT /update-password`
  - **Request Body:** `{ "newPassword": "string" }`
  - **Description:** Updates the password for the authenticated user.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the project's coding style and include appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any inquiries or feedback, please reach out via email: vishalverma9572@gmail.com



---

