Todo List Web Application
A simple web-based Todo List application built using React.js for the frontend and Node.js with Express.js and MongoDB for the backend.

![image](https://github.com/AbdulMoizKhan/Todo-App/assets/73781652/6d4cb733-1995-4831-bc7a-73a2830a6956)


Table of Contents
About
Features
Getting Started
Prerequisites
Installation
Usage
API Endpoints
Contributing
License
About
This project is a Todo List application that allows users to create, manage, and track their tasks. It provides a user-friendly interface with features like task filtering, task completion tracking, and user registration/login.

Features
User registration and login
Create, edit, and delete tasks
Mark tasks as completed
Filter tasks by completion status
Mobile-responsive design
Getting Started
Follow these instructions to set up and run the project on your local machine.

Prerequisites
Node.js installed
MongoDB installed and running
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/your-repo.git
Navigate to the project directory:

bash
Copy code
cd your-repo
Install frontend dependencies:

bash
Copy code
cd client
npm install
Install backend dependencies:

bash
Copy code
cd server
npm install
Create a .env file in the server directory with the following content:

bash
Copy code
MONGODB_URI=mongodb://localhost:27017/todo
SECRET_KEY=your_secret_key
Start the backend server:

bash
Copy code
cd server
npm start
Start the frontend development server:

bash
Copy code
cd client
npm start
Open your browser and visit http://localhost:3000 to use the application.

Usage
Register a new user account or log in with an existing one.
Create tasks by entering task descriptions and clicking "Add Task."
Mark tasks as completed by toggling the checkbox.
Use the filter options to view completed or uncompleted tasks.
Edit or delete tasks using the provided buttons.
Click the "Logout" button to log out.
API Endpoints
POST /register: Register a new user.
POST /login: Log in with a registered user.
GET /tasks: Retrieve user-specific tasks.
POST /tasks: Create or update user-specific tasks.
DELETE /tasks/:id: Delete a task by its ID.
Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow the Contributing Guidelines.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Feel free to customize the README further, add screenshots, or include any additional information that you think would be helpful for users.
