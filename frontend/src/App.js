import { useState,  useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Pages from "./Components/Pages";
import Signup from "./Components/Signup";
import UpdateDiary from "./Components/UpdateDiary";
function App() {
  const [login, setLogin] = useState(false);
  useEffect(() => {
  const isLoggedIn = localStorage.getItem("login");
  if(isLoggedIn){
    setLogin(true);
  }
  }, [login]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" exact element={<Pages />} />
        {login ? (
          <Route path="/updateDiary/:id" element={<UpdateDiary />} />
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
