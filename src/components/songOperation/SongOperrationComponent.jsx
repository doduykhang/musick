import React, { useContext, useState } from 'react'
import AddToPlaylistComponent from '../addToPlaylist/AddToPlaylistComponent'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './songOperationComporent.scss'
import updateSong from '../../apis/songs/updateSong';
import deleteSong from '../../apis/songs/deleteSong';
import { PopupContext } from '../../App';

const SongOperrationComponent = ({song,playlistId,onRemoveSong,edit,onDeleteSong}) => {
    const [name, setName] = useState(song.title);
    const [imgFile, setImgFile] = useState()
    const [imgSrc, setImgSrc] = useState(song.image_url)
    const popupContext = useContext(PopupContext);
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

    const handleUpdate = async () =>{
        var url = song.image_url;
        if(imgFile){
            url = await uploadImage();
        }
        await updateSong(song.id,name,url);
    }

    const handleDelete = async () =>{
        await deleteSong(song.id);
        onDeleteSong(song.id)
        popupContext.setPopup({
            trigger:false,
            children:<></>
        })
    }

    return (
        <div className='song-operation'>
            {edit==true &&
            <>
            <div className="info">
                <div className="img-choose">
                    <img src={imgSrc} alt="" />
                    <input type="file" id='selectedFile' style={{display:"none"}} onChange={(e)=>chooseImageFile(e)} />
                    <button onClick={chooseImgFile}>Choose image</button>
                </div>
                <div>
                    <div className='input'>
                        <div>Title</div>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div>
                        <button onClick={handleUpdate}>update</button>
                        <button onClick={handleDelete}>delete</button>
                    </div>
                </div>
            </div>
            
            </>
            }
            <div className='add-to-playlist'>Add to playlist</div>
            <AddToPlaylistComponent songId={song.id} playlistId={playlistId} onRemoveSong={onRemoveSong}/>
        </div>
    )
}

export default SongOperrationComponent
