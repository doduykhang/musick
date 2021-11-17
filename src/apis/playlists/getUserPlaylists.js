import { doc, getDocs, query, orderBy, collection, where } from "firebase/firestore";
import firestore from "../../firebase/firestore";


const getUserPlaylists = async (uid) =>{
    // const docRef = doc(firestore, "songs");
    const q = query(collection(firestore,"playlists"), where("uploader.uid","==",uid));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    const result = [];
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
        result.push({id:doc.id,...doc.data()})
    });
    return result;
}

export default getUserPlaylists;
