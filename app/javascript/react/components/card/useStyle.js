import { useEffect } from "react";

export const useStyle = ({ cards, openWindow }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gridClass = windowWidth > 600
    ? "grid grid-cols-2 gap-4"
    : "grid grid-cols-1 gap-4";
  return { gridClass };
}