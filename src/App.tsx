import "./App.css";
import { Outlet } from "react-router";
import Glassmorphism from "./components/Glassmorphism/Glassmorphism";
import Background from "./components/Background/Background";
import useMousePosition from "./utils/useMousePosition";

function App() {
  useMousePosition();
  return (
    <>
      <Glassmorphism />
      <Background />
      <Outlet />
    </>
  );
}

export default App;
