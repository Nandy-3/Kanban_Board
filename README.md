📌 React Kanban Board

A modern and responsive Kanban Task Management Application built using React JS and Tailwind CSS.

This application helps users organize tasks visually using columns such as To Do, In Progress, and Done. Users can create tasks, edit them, delete them, and move them between columns using drag-and-drop functionality.

The project focuses on React state management, Context API, drag-and-drop interaction, reusable components, and localStorage persistence.

🚀 Features

📝 Create new tasks

✏️ Edit task details

🗑 Delete tasks

📋 Organize tasks in columns

🔄 Drag and drop tasks between columns

📂 Task columns:

To Do

In Progress

Done

🪟 Task details modal

💾 Tasks saved using localStorage

⚡ Global state management using Context API

📱 Fully responsive layout

🎨 Styled using Tailwind CSS

🧰 Technologies Used

React JS (Vite)

Tailwind CSS

JavaScript (ES6)

React Hooks

useState

useEffect

useContext

Context API

react-beautiful-dnd / dnd-kit

localStorage

📂 Project Structure
src/
│
├── components/
│   ├── Board.jsx
│   ├── Column.jsx
│   ├── TaskCard.jsx
│   ├── TaskModal.jsx
│   └── TaskForm.jsx
│
├── context/
│   └── TaskContext.jsx
│
├── App.jsx
├── main.jsx
└── index.css
⚙️ Application Flow
📋 Task Board

Displays three columns:

To Do

In Progress

Done

Each column contains task cards showing:

Task title

Task description

Task status

➕ Create Task

Users can add a task using a task input form.

Task includes:

Title

Description

Status

🔄 Drag and Drop

Users can drag tasks between columns.

When moved:

Task status updates automatically

Data is saved in localStorage

🪟 Task Details

Clicking a task opens a modal window where users can:

View task details

Edit task information

Update task status

💾 Data Persistence

All tasks are stored in localStorage, which ensures:

Tasks remain after refreshing the page

No backend or external API is required

▶️ How to Run the Project
1️⃣ Clone the repository
git clone <your-repository-link>
2️⃣ Open project
cd kanban-board
3️⃣ Install dependencies
npm install
4️⃣ Run project
npm run dev
5️⃣ Open browser
http://localhost:5173