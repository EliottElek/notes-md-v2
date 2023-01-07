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
import Layout from "./layout";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import Context from "./components/Context";
function App() {
  const { folders } = useContext(Context);
  return (
    <div className="App w-full h-full">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout data={folders}>
                <Folders />
              </Layout>
            }
          />
          <Route
            path="/notes/:slug"
            element={
              <Layout data={folders}>
                <Note />
              </Layout>
            }
          />
          <Route
            path="/notes/:slug/edit"
            element={
              <Layout data={folders}>
                <Edit />
              </Layout>
            }
          />
          <Route
            path="notes/new"
            element={
              <Layout data={folders}>
                <New />
              </Layout>
            }
          />
          <Route
            path="/notes"
            element={
              <Layout data={folders}>
                <Notes />
              </Layout>
            }
          />
          <Route
            path="/folders/:id"
            element={
              <Layout data={folders}>
                <Folder />
              </Layout>
            }
          />
          <Route path="*" element={"haha"} />
          <Route path="/login" element={<Login />} />{" "}
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
