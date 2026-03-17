import { Route, Routes } from "react-router-dom"
import Login from "../features/auth/ui/Login"
import Register from "../features/auth/ui/Register"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<h1>Home page</h1>} />
            <Route path="/dashboard" element={<h1>Dashboard page</h1>} />
        </Routes>
    )
}

export default AppRoutes
