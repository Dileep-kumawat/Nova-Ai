import { Route, Routes } from "react-router-dom"
import Login from "../features/auth/ui/Login"
import Register from "../features/auth/ui/Register"
import Protected from "../features/auth/components/Protected"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<h1>Home page</h1>} />
            <Route path="/dashboard" element={
                <Protected>
                    <h1>Dashboard page</h1>
                </Protected>
            } />
        </Routes>
    )
}

export default AppRoutes
