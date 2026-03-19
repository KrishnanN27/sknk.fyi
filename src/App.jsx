import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Portfolio from "./pages/Portfolio";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Research from "./pages/Research";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import PomodoroPage from "./pages/PomodoroPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/research" element={<Research />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/pomodoro" element={<PomodoroPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
