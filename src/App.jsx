import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import ModifyList from "./pages/Modifylist";
import "./App.css";

function App() {
  return (
    <>
      <h1>Todo List Application</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/modify" element={<ModifyList />} />
      </Routes>
    </>
  );
}

export default App;
.