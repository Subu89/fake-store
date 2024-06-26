import { useEffect, useState } from "react";
import useAuthCheck from "./hooks/useAuthCheck";

function App() {
  // spinner while rendering ui
  const spinner = document.getElementById("spinner");

  if (spinner && !spinner.hasAttribute("hidden")) {
    spinner.setAttribute("hidden", "true");
  }

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

  return <></>;
}

export default App;
