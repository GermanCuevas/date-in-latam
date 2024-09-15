import { useEffect } from "react";

const useScreenVH = ({ containerRef } : any) => {
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        containerRef.current.style.height = `${window.innerHeight}px`;
      }
    };
    // Set the height on component mount
    updateHeight();
    // Update the height on window resize
    window.addEventListener("resize", updateHeight);
    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
};

export default useScreenVH;