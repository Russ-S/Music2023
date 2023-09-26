import { Routes, Route } from "react-router-dom";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";

import Home from "pages/Home";
import Dashboard from "pages/Dashboard";
import Recordings from "pages/Recordings";
import RecordingDetail from "pages/RecordingDetail";
import EditRecording from "pages/EditRecording";
import DeleteRecording from "pages/DeleteRecording";
import AddRecording from "pages/addRecording";
import Performances from "pages/Performances";
import PerformanceDetail from "pages/PerformanceDetail";
import EditPerformance from "pages/EditPerformance";
import AddPerformance from "pages/addPerformance";
import Composers from "pages/Composers";
import EditComposer from "pages/EditComposer";
import DeleteComposer from "pages/DeleteComposer";
import Labels from "pages/Labels";
import EditLabel from "pages/EditLabel";
import DeleteLabel from "pages/DeleteLabel";
import Media from "pages/Media";
import DeleteMedia from "pages/DeleteMedia";
import EditMedia from "pages/EditMedia";
import Categories from "pages/Categories";
import EditCategory from "pages/EditCategory";
import DeleteCategory from "pages/DeleteCategory";

function App() {
  return (
    <div className="App">
      <Navbar />

      <main className="content">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/recordings" element={<Recordings />} />
            <Route path="/recordings/add" element={<AddRecording />} />
            <Route path="/recordings/:id" element={<RecordingDetail />} />
            <Route path="/recordings/edit/:id" element={<EditRecording />} />
            <Route
              path="/recordings/delete/:id"
              element={<DeleteRecording />}
            />

            <Route path="/performances" element={<Performances />} />
            <Route path="/performances/add" element={<AddPerformance />} />
            <Route path="/performances/:id" element={<PerformanceDetail />} />
            <Route
              path="/performances/edit/:id"
              element={<EditPerformance />}
            />

            <Route path="/composers" element={<Composers />} />
            <Route path="/composers/edit/:id" element={<EditComposer />} />
            <Route path="/composers/delete/:id" element={<DeleteComposer />} />

            <Route path="/labels" element={<Labels />} />
            <Route path="/labels/edit/:id" element={<EditLabel />} />
            <Route path="/labels/delete/:id" element={<DeleteLabel />} />

            <Route path="/media" element={<Media />} />
            <Route path="/media/edit/:id" element={<EditMedia />} />
            <Route path="/media/delete/:id" element={<DeleteMedia />} />

            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/edit/:id" element={<EditCategory />} />
            <Route path="/categories/delete/:id" element={<DeleteCategory />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
