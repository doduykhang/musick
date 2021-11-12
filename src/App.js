import "./app.scss"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import MainFrameComponent from "./components/mainFrame/MainFrameComponent";
import Home from "./pages/home/Home";
import Playlist from "./pages/playlist/Playlist";
import Search from "./pages/search/Search";
import history from "./history";
import UploadSong from "./pages/uploadSong/UploadSong";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
function App() {
  return (
    <div className="app">
      <Router>
        <MainFrameComponent>
          <Routes history={history}>
              <Route exact path="/" 
                element={<Home/>}/>
              <Route exact path="/playlist"
                element={<UploadSong/>}/>
              <Route path="/search/"
                element={<Search/>}/>
              <Route path="/search/:queryp"
                element={<Search/>}/>
                <Route path="/register"
                element={<Register/>}/>
                <Route path="/login"
                element={<Login/>}/>
          </Routes>
        </MainFrameComponent>
        
      </Router>
    </div>
  );
}

export default App;
