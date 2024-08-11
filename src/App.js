import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Navbar } from './component/Navbar';
import { Home } from './component/Home';
import { About } from './component/About';
import { Contact } from "./component/Contact";
import NoteState from "./context/Notes/NoteState";
import  Alert  from "./component/Alert";
import { Login } from "./component/Login";
import { SignUp } from "./component/SignUp";
import { useState } from "react";



function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
        setAlert(null);
      }, 2000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alertshow={alert}/>
          <div className="container my-3">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/contact" element={<Contact />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signUp" element={<SignUp showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
