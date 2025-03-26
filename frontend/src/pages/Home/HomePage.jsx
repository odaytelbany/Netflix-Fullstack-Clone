import React from "react";
import ContentScreen from "./ContentScreen";
import AuthScreen from "./AuthScreen";
import { useAuthStore } from "../../store/authUser";

const HomePage = () => {
  const {user} = useAuthStore();
  return <>{user ? <ContentScreen /> : <AuthScreen />}</>;
};

export default HomePage;
