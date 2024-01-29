import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";

// Use when server is hosted locally
// axios.defaults.baseURL = "http://localhost:8000";

// Use when server is hosted on vercel
axios.defaults.baseURL = "https://supra-coder-project-backend.vercel.app";

function App() {
    return (
        <BrowserRouter>
            <Toaster
                position="bottom-center"
                toastOptions={{ duration: 2000 }}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
