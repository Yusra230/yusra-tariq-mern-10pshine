# Notes App 📝

Welcome to Notes App – a full‑stack web application built during my internship at 10Pearls.
It lets users sign up, log in, and manage their personal notes with a rich text editor.
The project follows industry best practices: clean code, comprehensive logging, error handling, unit testing, and code quality analysis.

## Project Overview ✨ 

The **Notes App** is designed to help users manage their notes efficiently. Each note is tied to an individual user, ensuring privacy and security. The app also incorporates robust logging, error handling, and unit testing, making it both reliable and maintainable.

Key highlights:

* **User authentication** with secure login and signup
* **CRUD operations** for notes
* **Rich text editing** for better note formatting
* **Application logging** using Pino Logger
* **Unit testing** for both frontend and backend
* **Database integration** using MongoDB
* **Code quality analysis** with SonarQube

## 🛠 Technology Stack

| Layer           | Technology / Tool                     |
| --------------- | ------------------------------------- |
| Frontend        | React.js                              |
| Backend         | Node.js                               |
| Database        | MongoDB                    |
| Logging         | Pino Logger                           |
| Unit Testing    | Mocha/Chai (backend), Jest (frontend) |
| Code Quality    | SonarQube                             |
| Version Control | Git                                   |

## Key Features ✨ 

### 1. User Authentication & Authorization

* Sign up, log in, and log out securely
* Notes are private and tied to the authenticated user

### 2. Notes Management

* Create, read, update, and delete notes
* Rich text editor support for better formatting
* Easy navigation between dashboard and editor

### 3. Application Logging

* Integrated **Pino Logger** for request/response logging, error logging, and activity tracking
* Logs help with debugging and monitoring application behavior

### 4. Exception Handling

* Global error handling middleware for graceful error messages
* Exceptions logged for easier debugging

### 5. Database Integration

* Store user and notes data securely
* Scalable design to support more features in the future

### 6. Unit Testing

* Backend testing with Mocha and Chai
* Frontend testing with Jest
* Focused on critical functionalities

### 7. Code Quality

* SonarQube integration to maintain clean, bug-free code

### 8. Optional / Future Enhancements

* Real-time note updates using Socket.IO
* Export and import notes as files
* Search and filter notes for better organization

## 🖥 Application Screens

### **1. Sign Up / Log In**

* Components: Sign-up form, Log-in form
* Operations: User registration, authentication, and redirect to the dashboard

### **2. Dashboard (List of Notes)**

* Components: List of user-specific notes, "Create New Note" button
* Operations: Fetch notes from backend, display them, navigate to editor

### **3. Note Editor**

* Components: Rich text editor, Save and Cancel buttons
* Operations: Create new notes or edit existing ones, save to backend, return to dashboard

### **4. User Profile**

* Components: User details, Logout button
* Operations: Display user info, log out user

## ⚡ Setup & Installation

1. **Clone the repository**

```bash
git clone <https://github.com/Yusra230/yusra-tariq-mern-10pshine.git>
cd yusra-tariq-mern-10pshine
```

2. **Install backend dependencies**

```bash
cd backend
npm install
```

3. **Install frontend dependencies**

```bash
cd frontend
npm install
```

4. **Configure environment variables**

* Create a `.env` file in backend folder:

```
PORT=<port-no>
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
# Email credentials (for sending notifications, password resets, etc.)
EMAIL_USER=<your-email>
EMAIL_PASS=<your-app-password-generated-by-email-provider>

```

5. **Run the backend**

```bash
npm run dev
```

6. **Run the frontend**

```bash
npm start
```

## 🧪 Running Tests

* **Backend:**

```bash
cd backend
npm test
```

* **Frontend:**

```bash
cd frontend
npm test
```
## 🙌 Acknowledgments

* Internship at **10Pearls** provided the opportunity to work on this project
* Thanks to the mentors for guidance on best practices, testing, and code quality
