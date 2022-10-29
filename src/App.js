// import './App.css';
import Chat from './page/Chat';
import Login from './page/Login';
import Register from './page/Register';
import ForgotPassword from './page/ForgotPassword';
import {Route,Routes} from 'react-router-dom';
import RegisterSucccess from './components/RegisterSuccess';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/registersuccess" element={<RegisterSucccess/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
