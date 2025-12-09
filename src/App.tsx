import "./App.css";
import { Outlet } from "react-router";
import Glassmorphism from "./components/Glassmorphism/Glassmorphism";
import Background from "./components/Background/Background";
import useMousePosition from "./utils/useMousePosition";
import { UserProvider } from "./context/userProvider";

function App() {
  useMousePosition();
  return (
    <>
      <UserProvider>
        <Glassmorphism />
        <Background />
        <Outlet />
      </UserProvider>
    </>
  );
}

export default App;
