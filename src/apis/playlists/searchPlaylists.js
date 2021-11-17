import { getDocs, getDoc, doc, query, collection, where, startAfter, startAt, limit, orderBy } from "firebase/firestore";
import firestore from "../../firebase/firestore";


const searchPlaylists = async (queryString,lastId) =>{
    var lastDoc = null;
    console.log(queryString)
    console.log('lastid: ',lastId)

    if(lastId){
        lastDoc = await getDoc(doc(firestore,'playlists',lastId));
    }

    const q = query(
        collection(firestore,"playlists"), 
        where("name",">=",queryString),
        where('name', '<=', queryString+ '\uf8ff'),
        orderBy('name'),
        lastDoc ? startAfter(lastDoc):startAt(0),
        limit(5)
    );
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach((doc) => {
        console.log('query: ',queryString)
        console.log('data: ',doc.data())
        result.push({id:doc.id,...doc.data()})
    });
    return result;
}

export default searchPlaylists;
