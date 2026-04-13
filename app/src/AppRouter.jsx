import { HashRouter, Routes, Route } from "react-router-dom";

// Views
import { Landing } from "./features/views/pages/Landing.jsx";
import { Dashboard } from "./features/views/pages/Dashboard.jsx";

// Auth
import { Login } from "./features/auth/pages/Login.jsx";
import { Register } from "./features/auth/pages/Register.jsx";
import { ChangePassword } from "./features/auth/pages/ChangePassword.jsx";

// Layout
import { Content } from "./features/layout/components/Content.jsx";

// API
import { ApiRyC_Axios } from "./features/api/components/ApiRyC.jsx";

const AppRouter = () => {
    return (
        <HashRouter>
            <Routes>

                {/* Rutas públicas */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/apis" element={<ApiRyC_Axios />} />

                {/* Rutas privadas (dentro del layout) */}
                <Route path="/dashboard" element={
                    <Content><Dashboard /></Content>
                } />

            </Routes>
        </HashRouter>
    );
};

export default AppRouter;
