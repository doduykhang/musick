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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Library from "./pages/library/Library";
import CreatePlaylist from "./pages/createPlaylist/CreatePlaylist";
import getUserPlaylists from "./apis/playlists/getUserPlaylists";

export const SongContext = React.createContext();
export const PlaylistContext = React.createContext();
export const UserContext = React.createContext();
function App() {
  
  const [user, setUser] = useState(null);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser(user);
        // ...
    } else {
        // User is signed out
        // ...
        setUser(null);
    }
    });
  
  const [currentSong, setCurrentSong] = useState({})
  const [playlists, setPlaylists] = useState([])

  useEffect(async () => {
    if(user){
        const userPlaylists = await getUserPlaylists(user.uid);
        setPlaylists(userPlaylists);
    }
  }, [user])

  return (
    <div className="app">
      <Router>
        <UserContext.Provider value={{user,setUser}}>
        <SongContext.Provider value={{currentSong,setCurrentSong}}>
        <PlaylistContext.Provider value={{playlists,setPlaylists}}>
        <MainFrameComponent user={user}>
          <Routes history={history}>
              <Route exact path="/" 
                element={<Home/>}/>
              <Route exact path="/playlist/:id"
                element={<Playlist/>}/>
              <Route path="/search/"
                element={<Search result={false}/>}/>
              <Route path="/search/:queryp"
                element={<Search result={true}/>}/>
                <Route path="/register"
                element={<Register user={user}/>}/>
                <Route path="/login"
                element={<Login user={user}/>}/>
                <Route path="/library"
                element={<Library user={user}/>}/>
                <Route path="/upload-song"
                element={<UploadSong user={user}/>}/>       

          </Routes>
        </MainFrameComponent>
        </PlaylistContext.Provider>
        </SongContext.Provider>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
