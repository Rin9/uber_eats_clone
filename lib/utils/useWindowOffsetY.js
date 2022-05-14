import { useState, useEffect } from "react";

export default function useWindowOffsetY() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowOffsetY, setWindowOffsetY] = useState(null);

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== "undefined") {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowOffsetY(window.pageYOffset);
      }

      // Add event listener
      window.addEventListener("scroll", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowOffsetY;
}
