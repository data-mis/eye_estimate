import LoginPage from "./component/loginPage";
import NavigationPage from "./component/navigation";
import "./css/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage></LoginPage>}></Route>
        <Route path="/Main" element={<NavigationPage></NavigationPage>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
