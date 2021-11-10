import React from 'react'
import "./playlist.scss"
import {songs} from '../../data/songData';
import DisplayListComponent from '../../components/displayList/DisplayListComponent';
import SongListItem from '../../components/songListItem/SongListItem';
const imgUrl = "https://i.scdn.co/image/ab67616d00004851385ac348a7d7906a6cd9f0d7";
const Playlist = () => {
    const header = [
        {
            title:"TITLE",
            flex:"4"
        },
        {
            title:"ALBUM",
            flex:"2"
        },
        {
            title:"DATE ADDED",
            flex:"2"
        },
        {
            title:"DURATION",
            flex:"2"
        }
    ]
    return (
        <div className="playlist">
            <div className="top">
                <div className="info-wrapper">
                    <img src={imgUrl} alt="" />
                    <div className="info">
                        <div className="type">Playlist</div>
                        <div className="name">name fadsfssadfasdfadsfadf</div>
                        <div className="desc">desc fadsfssadfasdfadsfadf</div>
                    
                    </div>
                </div>
            </div>
            <div className="bottom">
                <DisplayListComponent header={header}>
                    {songs.map(song =>{
                        return(
                            <SongListItem song={song}/>
                            )
                        })}
                </DisplayListComponent>
            </div>
        </div>
    )
    // return (
    //     <div className="playlist">
    //         <div className="top">
    //             <div className="info-wrapper">
    //                 <img src={imgUrl} alt="" />
    //                 <div className="info">
    //                     <div className="type">Playlist</div>
    //                     <div className="name">name fadsfssadfasdfadsfadf</div>
    //                     <div className="desc">desc fadsfssadfasdfadsfadf</div>
                        
    //                 </div>
    //             </div>
    //         </div>
    //         <div className="bottom">
    //             <SongListComponent songs={songs}/>
    //         </div>
    //     </div>
    // )
}

export default Playlist
