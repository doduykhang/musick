import React, { useEffect, useState } from 'react'
import * as Icons from '@material-ui/icons'
import './gridItemComponent.scss'

const GridItemComponent = ({type,border,playlist}) => {

    const [desc, setDesc] = useState('');

    useEffect(() => {
        let _desc;
        type === 'album' ? 
        _desc = 'Miku, More More Jump':
        type === 'playlist'?
        _desc ='by ' + playlist.uploader.name:
        _desc = type
        setDesc(_desc)
    }, [])

    return (
        <div className="grid-item">
            <div className="wrapper">
                <img src={playlist.img_url} style={{borderRadius:border}}/>
                <div className="info">
                    <div className="title">
                        {playlist.name}
                    </div>
                    <div className="desc">
                        {desc}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GridItemComponent
