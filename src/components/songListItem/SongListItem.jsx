import React from 'react'
import "./songListItem.scss"

const SongListItem = ({song,forwardRef}) => {
    return (
        <div className="playlistSong" ref={forwardRef}>
            <div className="info-wrapper">
                <img src={song.img} alt="" />
                <div className="info">
                    <div className="title">{song.title}</div>
                    <div className="artist">{song.artist}</div>
                </div>
            </div>
            <div className="album">{song.album}</div>
            <div className="date-added">{song.uploadedDate.toLocaleDateString("en-US")}</div>
            <div className="duration">{song.duration}</div>
        </div>
    )
}

export default SongListItem
