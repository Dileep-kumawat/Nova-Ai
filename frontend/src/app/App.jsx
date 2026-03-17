import { useEffect } from "react"
import { useAuth } from "../features/auth/hooks/useAuth"
import AppRoutes from "./AppRoutes"

const App = () => {

  const auth = useAuth()

  useEffect(() => {
    auth.handleGetMe()
  }, []);

  return (
    <AppRoutes />
  )
}

export default App
