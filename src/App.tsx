import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
// import HomePage from "./pages/HomePage";
import DronePage from "./pages/DronePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<HomePage />} /> */}
          <Route index element={<DronePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
