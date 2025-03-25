import React from "react";
import ContentScreen from "./ContentScreen";
import AuthScreen from "./AuthScreen";

const HomePage = () => {
  const user = false;
  return <div>{user ? <ContentScreen /> : <AuthScreen />}</div>;
};

export default HomePage;
