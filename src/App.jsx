import { Routes, Route } from 'react-router-dom';
import Board from './components/Board';
import TaskFormPage from './components/TaskFormPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Board />} />
      <Route path="/task/new" element={<TaskFormPage />} />
      <Route path="/task/:id" element={<TaskFormPage />} />
    </Routes>
  )
}

export default App;