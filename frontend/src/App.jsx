import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/signupPage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/signup" element={<SignupPage />}/>
      <Route path="/login" element={<LoginPage />}/>
    </Routes>
  )
}

export default App
