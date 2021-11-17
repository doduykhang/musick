import { collection, addDoc } from "firebase/firestore"; 
import firestore from '../../firebase/firestore'
const addToPlayList = async (songId,playlistId) =>{
    await addDoc(collection(firestore, "playlists_songs"), {
        song_id: songId,
        playlist_id: playlistId
    }); 
}

export default addToPlayList