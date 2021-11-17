import React, { useContext, useEffect, useRef, useState } from 'react'
import firestore from '../../firebase/firestore';
import { collection, addDoc, getDoc, doc } from "firebase/firestore"; 
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UserContext } from '../../App';
import './uploadSong.scss'



const UploadSong = () => {
    const [name, setName] = useState('')
    const [audioFile, setAudioFile] = useState();
    const [imgFile, setImgFile] = useState()
    const audioRef = useRef();
    const [audioSrc, setAudioSrc] = useState('')
    const [imgSrc, setImgSrc] = useState('')
    const [genre, setGenre] = useState('Rock');
    const [uploadProgess, setUploadProgess] = useState(0);
    const progessRef = useRef();
    const userContext = useContext(UserContext);
    const uploadSong = async () =>{
        return new Promise((resolve, reject) => {
            const storage = getStorage();
            const timeStamp = new Date()
            const storageRef = ref(storage,'songs/'+audioFile.name+timeStamp);
            const uploadTask = uploadBytesResumable(storageRef, audioFile);
        
            uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgess(progress)
                progessRef.current.style.background = 'linear-gradient'+'('
                    +'to right,'
                    +'green 0%,'
                    +'green '+progress+'%,'
                    +'#fff '+progress+'%,'
                    +'#fff 100%'
                +')';
            }, 
            (error) => {
                reject();
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL)
                    
                });
            }
            );
        });
    }

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

    const upload = async (e) =>{
        e.preventDefault();
        setUploadProgess(0)
        var urls;
        await Promise.all([uploadSong(),uploadImage()])
        .then((values)=>{
            urls = values;
        });
        const checkUser = await getDoc(doc(firestore, "users", userContext.user.uid));
        console.log(checkUser.data());
        const docRef = await addDoc(collection(firestore, "songs"), {
            title: name,
            genre: genre,
            audio_url: urls[0],
            image_url: urls[1],
            uploader:{
                uid: userContext.user.uid,
                name: checkUser.data().display_name
            },
            duration: audioRef.current.duration,
            uploaded_date: new Date()
        });
        progessRef.current.style.background = 
        'linear-gradient'+'('
            +'to right,'
            +'blue 0%,'
            +'blue 100%,'
            +'#fff 0%,'
            +'#fff 0%'
        +')';
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

    const chooseAudioFile = (e) =>{
        var file = e.target.files[0];
        setAudioFile(file);

        if (FileReader && file) {
            var fr = new FileReader();
            fr.onload = function () {
                setAudioSrc(fr.result)
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
        <div className='upload-song'>
            {audioSrc && <audio src={audioSrc} ref={audioRef}/>}
            <div className="img-choose">
                <img src={imgSrc} alt="" />
                <input type="file" id='selectedFile' style={{display:"none"}} onChange={(e)=>chooseImageFile(e)} />
                <button onClick={chooseImgFile}>Choose image</button>
            </div>
            <form action="">
               
                <div className="input">
                    <div>Title</div>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className="input">
                    <div>Genre</div>
                    <select value={genre} onChange={(e)=>setGenre(e.target.value)}>
                        <option value="Pop">Pop</option>
                        <option value="Rock">Rock</option>
                    </select>
                </div>
                
                <div className="input">
                    <div>Song file</div>
                    <input type="file" onChange={(e)=>chooseAudioFile(e)} />
                </div>
                
                <button onClick={upload}>upload</button>
                <input type="range" className="progess" ref={progessRef}/>
            </form>
        </div>
    )
}

export default UploadSong
