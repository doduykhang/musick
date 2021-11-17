import { doc, getDocs, query, orderBy, collection, where } from "firebase/firestore";
import firestore from "../../firebase/firestore";
import { documentId } from 'firebase/firestore'

const getPlaylistSongs = async (playlistId) =>{
    // const docRef = doc(firestore, "songs");
    const q = query(
        collection(firestore, "playlists_songs"),
        where('playlist_id','==',playlistId)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    const songIds = [];
    querySnapshot.forEach((doc) => {
        songIds.push(doc.data().song_id);
    });
    const result = [];
    if(songIds.length != 0){
        const q2 = query(collection(firestore, "songs"), where(documentId(),'in',songIds));
        const songs = await getDocs(q2);
        
        songs.forEach((song)=>{
            result.push({id:song.id,...song.data()});
        })
    }
    
    return result;
}

export default getPlaylistSongs;
