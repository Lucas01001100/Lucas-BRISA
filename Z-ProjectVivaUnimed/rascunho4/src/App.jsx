import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Agenda from "./components/Agenda";
import Profissionais from "./components/Profissionais";
import NoShow from "./components/NoShow";
import "./styles.css";

export default function App() {
  const [screen, setScreen] = useState("login");

  return (
    <>
      {screen === "login" && <Login go={setScreen} />}
      {screen === "dashboard" && <Dashboard go={setScreen} />}
      {screen === "agenda" && <Agenda go={setScreen} />}
      {screen === "profissionais" && <Profissionais go={setScreen} />}
      {screen === "noshow" && <NoShow go={setScreen} />}
    </>
  );
}
