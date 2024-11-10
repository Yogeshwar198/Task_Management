# Task Management

This is a full-stack task management application built using React for the frontend and Node.js with Express for the backend. It allows users to manage tasks across multiple categories such as To Do, In Progress, Done, and Timeout. The application interacts with a backend API to perform CRUD operations on tasks and includes features such as form validation, error handling, and timeout management. Tasks that exceed a certain time limit are automatically moved to the "Timeout" category.

---

## Frontend

### Technologies Used:
- **React**: A JavaScript library for building user interfaces.
- **TailwindCSS**: A utility-first CSS framework for rapidly building custom designs.
- **Axios**: A promise-based HTTP client for the browser and Node.js.
- **Task List**: Displays tasks with relevant information.
- **Task Item**: Individual task details displayed in a structured format.
- **Task Form**: Allows adding and editing tasks with proper form validation and error handling.
- **State Management**: Uses React hooks or the Context API for managing the state across the application.
- **API Integration**: Uses async/await to make API calls to the backend.
- **Timeout Handling**: Automatically moves tasks to the "Timeout" category if their duration exceeds a specific limit.
- **Error Handling & UX**: Includes loading indicators, error messages, and good UX practices.

### Installation (Frontend)

To run this application locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**
```bash
cd <filename>
```

3. **Install the dependencies:**
```bash
npm install
```
4. **Run the application:**
```bash
npm start
```
5. **Open your browser and visit:**
```bash
http://localhost:3000
```

## Backend
### Technologies Used:

- **Express**: A fast, unopinionated web framework for Node.js.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Cors**: A package for enabling Cross-Origin Resource Sharing.
- **Dotenv**: A module for loading environment variables from a .env file.
- **Nodemon**: A tool for automatically restarting the server during development.

   ### Installation (Backend)

To run this application locally, follow these steps:


2. **Navigate to the project directory:**
```bash
 cd backend
```

3. **Install the dependencies:**
```bash
npm install
```
4. **Run the application:**
```bash
npm run server
```
5. **Open your browser and visit:**
```bash
http://localhost:4000
```
## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
Yogeshwar Singh - yogeshwaredu198@gmail.com
