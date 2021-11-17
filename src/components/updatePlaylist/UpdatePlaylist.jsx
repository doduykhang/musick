import React, { useContext, useEffect, useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import firestore from '../../firebase/firestore';
import './updatePlaylist.scss'
import deletePlaylist from '../../apis/playlists/deletePlaylist' 
import { PlaylistContext, PopupContext } from '../../App';
import {useNavigate} from 'react-router-dom';

const UpdatePlaylist = ({playlist,onUpdatePlaylist}) => {
    const [name, setName] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [desc, setDesc] = useState('');
    const [imgFile, setImgFile] = useState()
    const playlistContext = useContext(PlaylistContext);
    const popupContext = useContext(PopupContext);
    const navigate = useNavigate();
    useEffect(()=>{
        setName(playlist.name);
        setImgSrc(playlist.img_url);
        setDesc(playlist.desc)
    },[])

    const uploadImage = async () =>{
        
        return new Promise((resolve, reject) => {
            const storage = getStorage();
            if(imgFile){
                const timeStamp = new Date()
                const storageRef = ref(storage,'images/'+imgFile.name+timeStamp);
                const uploadTask = uploadBytesResumable(storageRef, imgFile);
                
                uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                }, 
                (error) => {
                    reject()
                }, 
                () => {
                    
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    });
                }
                );
            }else{
                getDownloadURL(ref(storage, 'images/default_playlist_image.png'))
                .then((url) => {
                    resolve(url)
                })
                .catch((error) => {

                });
                
            }
            
        });
    }

    const handleUpdatePlaylist = async (e) =>{
        e.preventDefault();
        var url = playlist.img_url;
        if(imgFile){
            await uploadImage().then((value)=>{
                url = value;
            })
        }
        await updateDoc(doc(firestore,'playlists',playlist.id),{
            img_url: url,
            name: name,
            desc: desc
        }).then(()=>{
            onUpdatePlaylist(name,url,desc)
        })
    }

    const handleDeletePlaylist = async (e) =>{
        e.preventDefault()
        await deletePlaylist(playlist.id);
        playlistContext.setPlaylists(
            playlistContext.playlists.filter((pl)=>{
                return pl.id !== playlist.id;
            })
        )
        popupContext.setPopup({
            trigger:false,
            children:<></>
        })
        navigate('/')
    }

    const chooseImageFile = (e) =>{
        var file = e.target.files[0];
        setImgFile(file);

        if (FileReader && file) {
            var fr = new FileReader();
            fr.onload = function () {
                setImgSrc(fr.result)
            }
            fr.readAsDataURL(file);
        }
    
        // Not supported
        else {
            // fallback -- perhaps submit the input to an iframe and temporarily store
            // them on the server until the user's session ends.
        }
    }

    const chooseImgFile = () =>{
        document.getElementById('selectedFile').click();
    }

    return (
        <div className='update-playlist'>

            <div className="img-choose">
                <img src={imgSrc} alt="" />
                <input type="file" id='selectedFile' style={{display:"none"}} onChange={(e)=>chooseImageFile(e)} />
                <button onClick={chooseImgFile}>Choose image</button>
            </div>
            <form action="">
               
                <div className="input">
                    <div>Name</div>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                </div>

                <div className="desc">
                    <div>Description</div>
                    <textarea  value={desc} onChange={(e)=>setDesc(e.target.value)} />
                </div>
                <button onClick={handleUpdatePlaylist}>Update</button>
                <button onClick={handleDeletePlaylist}>Delete</button>
            </form>
        </div>
    )
}

export default UpdatePlaylist
