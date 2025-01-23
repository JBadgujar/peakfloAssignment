import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskPage from "./app/task/[id]/page";
import Home from "./app/page";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:id" element={<TaskPage />} />
      </Routes>
    </Router>
  );
}