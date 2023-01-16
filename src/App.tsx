import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AllCourses from "./pages/AllCourses";
import AllNews from "./pages/AllNews";
import Classmates from "./pages/Classmates";
import Course from "./pages/Course";
import Home from "./pages/Home";
import News from "./pages/News";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/news" element={<AllNews />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/classmates" element={<Classmates />} />
          <Route path="/course/:id" element={<Course />} />
          <Route path="/news/:id" element={<News />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
