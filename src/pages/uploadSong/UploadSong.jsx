import React, { useEffect } from 'react'
import firestore from '../../firebase/firestore';
import { collection, addDoc } from "firebase/firestore"; 


const UploadSong = () => {

    useEffect(async () => {
        try {
            const docRef = await addDoc(collection(firestore, "users"), {
                first: "Ada",
                last: "Lovelace",
                born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default UploadSong
