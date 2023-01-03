import { BrowserRouter, Routes, Route } from "react-router-dom";
import Notes from "./pages";
import Note from "./pages/notes";
import New from "./pages/new";
import Edit from "./pages/notes/edit";
import "highlight.js/styles/atom-one-dark.css";
import "react-markdown-editor-lite/lib/index.css";
import "./style/css/ffolders.css";
import Login from "./components/Login";
import Folders from "./pages/folders";
import Folder from "./pages/folders/folder";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App w-full h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Folders />} />
          <Route path="/folders/:id/notes/:slug" element={<Note />} />
          <Route path="/folders/:id/notes/:slug/edit" element={<Edit />} />
          <Route path="/folders/:id/new" element={<New />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/folders/:id" element={<Folder />} />
          <Route path="*" element={"haha"} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
