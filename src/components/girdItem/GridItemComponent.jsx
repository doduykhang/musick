import React, { useEffect, useState } from 'react'
import * as Icons from '@material-ui/icons'
import './gridItemComponent.scss'
const imgUrl = "https://i.scdn.co/image/ab67706f00000002c9f71ed97ed8a033d67df52a"

const GridItemComponent = ({type,border}) => {

    const [desc, setDesc] = useState('');

    useEffect(() => {
        let _desc;
        type === 'album' ? 
        _desc = 'Miku, More More Jump':
        type === 'playlist'?
        _desc ='by Miku':
        _desc = type
        setDesc(_desc)
    }, [])

    return (
        <div className="grid-item">
            <div className="wrapper">
                <img src={imgUrl} style={{borderRadius:border}}/>
                <div className="info">
                    <div className="title">
                        Today's top hit
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
