import { Route, Routes } from "react-router-dom"
import Login from "../features/auth/ui/Login"
import Register from "../features/auth/ui/Register"
import Protected from "../features/auth/components/Protected"
import Home from "../features/shared/ui/Home"
import Chat from "../features/chat/ui/Chat"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={
                <Protected>
                    <Chat />
                </Protected>
            } />
        </Routes>
    )
}

export default AppRoutes
