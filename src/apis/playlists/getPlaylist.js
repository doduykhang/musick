import { doc, getDoc } from "firebase/firestore";
import firestore from "../../firebase/firestore";


const getPlaylist = async (id) =>{
    const docRef = doc(firestore, "playlists", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return {id:docSnap.id,...docSnap.data()};
    } else {
        return null;
    }
}

export default getPlaylist;
