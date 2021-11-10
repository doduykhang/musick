import React, { useEffect, useRef, useState } from 'react'
import "./playerComponent.scss"
import * as Icons from '@material-ui/icons'
import RangeSlider from 'react-bootstrap-range-slider';
import { isElementOfType } from 'react-dom/test-utils';
const imgUrl = "https://i.scdn.co/image/ab67616d00004851385ac348a7d7906a6cd9f0d7";
const mp3Url = "https://docs.google.com/uc?export=download&id=1hI050DRu3K6hxd0mIgfPlLKYpBlKI70z";

const PlayerComponent = () => {
    const audioRef = useRef();

    const [sliderValue, setSliderValue] = useState(0);
    const sliderRef = useRef();
    const [isPlayed, setIsPlayed] = useState(false);

    const [volumeValue, setVolumeValue] = useState(50);
    const [isMuted, setIsMuted] = useState(false);
    const volumeRef = useRef();

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        sliderRef.current.style.background = 'linear-gradient'+'('
            +'to right,'
            +'green 0%,'
            +'green '+sliderValue+'%,'
            +'#fff '+sliderValue+'%,'
            +'#fff 100%'
          +')';
    }, [sliderValue])

    useEffect(() => {
        volumeRef.current.style.background = 'linear-gradient'+'('
            +'to right,'
            +'green 0%,'
            +'green '+volumeValue+'%,'
            +'#fff '+volumeValue+'%,'
            +'#fff 100%'
          +')';
    }, [volumeValue])

    const handleChangeSliderValue = (evt) =>{
        let currentTime = duration*(evt.target.value/100)
        setCurrentTime(currentTime);
        setSliderValue(evt.target.value);
        audioRef.current.currentTime = currentTime;
    }

    const handleChangeVolumeValue = (evt) =>{
        setVolumeValue(evt.target.value);
        audioRef.current.volume = evt.target.value/100
    }

    const handleClick = () =>{
        if(!isMuted){
            setVolumeValue(0);
            audioRef.current.muted = true;
        }
        else{
            setVolumeValue(audioRef.current.volume*100);
            audioRef.current.muted = false;
        }
        setIsMuted(!isMuted);
    }

    const handleLoadMetadata = () =>{
        setVolumeValue(audioRef.current.volume*100)
        setDuration(audioRef.current.duration);
    }

    const handlePlay = () =>{
        if(!isPlayed)
            audioRef.current.play()
        else 
            audioRef.current.pause()
        setIsPlayed(!isPlayed);
    }

    const handleTimeUpdate = () =>{
        let currentTime = audioRef.current.currentTime;
        setCurrentTime(currentTime);
        setSliderValue((currentTime/duration)*100);
    }

    const formatTime = (value) =>{
        let minute = Math.floor(value / 60);
        let second = Math.floor(value % 60);
        let formattedMinute = minute.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })

        let formattedSecond = second.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })

        return formattedMinute+":"+formattedSecond;
    }

    return (
        <div className="player" >
            <audio src={mp3Url} 
                ref={audioRef}
                onLoadedMetadata={handleLoadMetadata}
                onTimeUpdate={handleTimeUpdate}
                onPause={()=>{setIsPlayed(false)}}
            />
                
            
                
            
            <div className="info-wrapper">
                <img src={imgUrl} alt="" />
                <div className="info">
                    <span className="title">title</span>
                    <span className="artist">artist</span>
                </div>
            </div>
            <div className="control">
                <div className="control-wrapper">
                    <Icons.SkipPrevious className="icon other-icon"/>
                    {!isPlayed ? (
                        <Icons.PlayCircleFilledOutlined 
                            onClick={handlePlay}
                            className="icon other-icon"/>                        
                    ):(
                        <Icons.PauseCircleFilledOutlined
                            onClick={handlePlay}
                            className="icon other-icon"/> 
                    )}
                    <Icons.SkipNext className="icon other-icon"/>
                </div>
                <div className="progess">    
                    <div className="time">{formatTime(currentTime)}</div>
                    <input type="range" 
                            min="0" max="100" 
                            value={sliderValue} 
                            onChange={handleChangeSliderValue}
                            className="slider"
                            ref={sliderRef}/>
                    <div className="time">{formatTime(duration)}</div>
                </div> 
            </div>
            
            <div className="function">
                <Icons.PlaylistPlay className="icon"/>
                {!isMuted ? (
                    <Icons.VolumeUp 
                        className="icon"
                        onClick={handleClick}/>
                ):(
                    <Icons.VolumeMute 
                        className="icon"
                        onClick={handleClick}/>
                )}
                
                <input type="range" 
                            min="0" max="100" 
                            value={volumeValue} 
                            onChange={handleChangeVolumeValue}
                            className="slider"
                            ref={volumeRef}/>
            </div>
        </div>
    )
}

export default PlayerComponent;