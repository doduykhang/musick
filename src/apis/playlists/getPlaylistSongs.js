import { doc, getDocs, query, orderBy, collection, where } from "firebase/firestore";
import firestore from "../../firebase/firestore";
import { documentId } from 'firebase/firestore'

const getPlaylistSongs = async (playlistId) =>{
    // const docRef = doc(firestore, "songs");
    const q = query(collection(firestore, "playlists", playlistId, 'songs'));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    const songIds = [];
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    songIds.push(doc.id)
    });
    const q2 = query(collection(firestore, "songs"), where(documentId(),'in',songIds));
    const songs = await getDocs(q2);
    const result = [];
    songs.forEach((song)=>{
        result.push(song.data());
    })
    console.log(result)
    return result;
}

export default getPlaylistSongs;
