import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/signupPage"
import HomePage from "./pages/Home/HomePage"

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
