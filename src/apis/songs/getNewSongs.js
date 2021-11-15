import { doc, getDocs, query, orderBy, collection } from "firebase/firestore";
import firestore from "../../firebase/firestore";


const getNewSongs = async () =>{
    // const docRef = doc(firestore, "songs");
    const q = query(collection(firestore,"songs"), orderBy("uploaded_date"));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    const result = [];
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
        result.push({id:doc.id,...doc.data()})
    });
    return result;
}

export default getNewSongs;
