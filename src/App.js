import './App.css';
import Chat from './page/Chat';
import Login from './page/Login';
import Register from './page/Register';
import {Route,Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
    </div>
  );
}

export default App;
