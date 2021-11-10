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
function App() {
  return (
    <div className="app">
      <Router>
        <MainFrameComponent>
          <Routes history={history}>
              <Route exact path="/" 
                element={<Home/>}/>
              <Route exact path="/playlist"
                element={<Playlist/>}/>
              <Route path="/search/:queryp"
                element={<Search/>}/>
          </Routes>
        </MainFrameComponent>
        
      </Router>
    </div>
  );
}

export default App;
