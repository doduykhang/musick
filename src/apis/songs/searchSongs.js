import { getDocs, getDoc, doc, query, collection, where, startAfter, startAt, limit, orderBy } from "firebase/firestore";
import firestore from "../../firebase/firestore";


const searchSongs = async (queryString,lastId) =>{
    var lastDoc = null;
    
    if(lastId){
        lastDoc = await getDoc(doc(firestore,'songs',lastId));
    }

    const q = query(
        collection(firestore,"songs"), 
        where("title",">=",queryString),
        where('title', '<=', queryString+ '\uf8ff'),
        orderBy('title'),
        lastDoc ? startAfter(lastDoc):startAt(0),
        limit(5)
    );
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach((doc) => {
        result.push({id:doc.id,...doc.data()})
    });
    return result;
}

export default searchSongs;
