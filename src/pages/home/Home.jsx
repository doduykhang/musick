import React, { useEffect, useState } from 'react'
import DisplayGridComponent from '../../components/displayGrid/DisplayGridComponent'
import getNewSongs from '../../apis/songs/getNewSongs'
import "./home.scss"
import DisplayListComponent from '../../components/displayList/DisplayListComponent'
import SongListItem from '../../components/songListItem/SongListItem'
import PopupComponent from '../../components/popup/PopupComponent'
const Home = () => {
    const [songs, setSongs] = useState([])
    useEffect(async () => {
        const newSongs = await getNewSongs();
        setSongs(newSongs);
        
    }, [])

    const header = [
        {
            title:"TITLE",
            flex:4
        },
        {
            title:"UPLOADER",
            flex:2
        },
        {
            title:"ADDED DATE",
            flex:2
        },
        {
            title:"DURATION",
            flex:2
        }
    ]

    return (
        <div className="home">
            <DisplayListComponent header={header} onScrollToBottom={()=>{}}>
                {songs.map(song =>{
                    return (<SongListItem key={song.id} song={song}/>)
                })}
            </DisplayListComponent>     
        </div>
    )
}

export default Home
