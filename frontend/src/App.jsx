import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/signupPage"
import HomePage from "./pages/Home/HomePage"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser"
import { useEffect } from "react"
import { Loader } from "lucide-react"

function App() {

  const { user, isCheckingAuth, authCheck } = useAuthStore();
  console.log("user: ", user);
  useEffect(() => {
    authCheck();
  }, [authCheck])

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="text-red-600 size-10 animate-spin"/>
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  )
}

export default App
