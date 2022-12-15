import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Note from "./pages/notes";
import New from "./pages/new";
import Edit from "./pages/notes/edit";
import "highlight.js/styles/atom-one-dark.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes/:slug" element={<Note />} />
          <Route path="/notes/:slug/edit" element={<Edit />} />
          <Route path="new" element={<New />} />
          <Route path="*" element={"haha"} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
