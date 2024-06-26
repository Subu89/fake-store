import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ScrollToTopButton from "./components/ScrollToTop";
import useAuthCheck from "./hooks/useAuthCheck";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";

function App() {

  const authCheck = useAuthCheck();

  const [showScrollButton, setShowScrollButton] = useState(false);

  // scroll to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {showScrollButton && <ScrollToTopButton />}

      <ToastContainer position="bottom-left" autoClose={3000} />
    </>
  );
}

export default App;
