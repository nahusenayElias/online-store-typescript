import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import List from "./components/List";
import StoreNavBar from "./components/StoreNavBar";

function App() {
  return (
    <div className="App">
      <StoreNavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;