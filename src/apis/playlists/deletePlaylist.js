import { collection, doc, deleteDoc, getDocs, query, where, writeBatch } from "firebase/firestore";
import firestore from '../../firebase/firestore'

const deletePlaylist = async (playlistId) =>{
    const q = query(
        collection(firestore,'playlists_songs'),
        where('playlist_id','==',playlistId)
    )

    const snapshot = await getDocs(q);
    var batch = writeBatch(firestore)
    snapshot.forEach(function(doc) {
        // For each doc, add a delete operation to the batch
        batch.delete(doc.ref);
    });

    // Commit the batch
    batch.commit();    

    await deleteDoc(doc(firestore, "playlists", playlistId));
}

export default deletePlaylist;