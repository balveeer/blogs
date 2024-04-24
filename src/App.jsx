import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <div className="min-h-screen w-full text-3xl bg-teal-800">loading...</div>
  ) : (
    <div>
      <Header />
      {/* <div className="w-full h-12"></div> */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
