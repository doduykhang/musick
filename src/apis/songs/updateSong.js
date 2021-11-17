import firestore from '../../firebase/firestore'
import { doc, updateDoc } from "firebase/firestore";

const updateSong = async (songId,title,img_url) =>{
    await updateDoc(doc(firestore,'songs',songId),{
        image_url:img_url,
        title:title
    })
}

export default updateSong