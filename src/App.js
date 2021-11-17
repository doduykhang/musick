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
import UploadSong from "./components/uploadSong/UploadSong";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Library from "./pages/library/Library";
import getUserPlaylists from "./apis/playlists/getUserPlaylists";
import PopupComponent from "./components/popup/PopupComponent";

export const SongContext = React.createContext();
export const PlaylistContext = React.createContext();
export const UserContext = React.createContext();
export const PopupContext = React.createContext();

function App() {
  
  const [user, setUser] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
        setUser(user);
        setIsUserLoaded(true)
    } else {
        setUser(null);
        setIsUserLoaded(true)
    }
  });
  
  const [currentSong, setCurrentSong] = useState({})
  const [playlists, setPlaylists] = useState([])
  const [popup, setPopup] = useState({trigger:false,children:<div>child</div>})
  useEffect(async () => {
    if(user){
        const userPlaylists = await getUserPlaylists(user.uid);
        setPlaylists(userPlaylists);
    }
  }, [user])
  if(!isUserLoaded)
    return (<div>Loading...</div>)
  return (
    <div className="app">
      <Router>
        <UserContext.Provider value={{user,setUser}}>
        <SongContext.Provider value={{currentSong,setCurrentSong}}>
        <PlaylistContext.Provider value={{playlists,setPlaylists}}>
        <PopupContext.Provider value={{popup,setPopup}}>
          <PopupComponent/>
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
        </PopupContext.Provider>
        </PlaylistContext.Provider>
        </SongContext.Provider>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
