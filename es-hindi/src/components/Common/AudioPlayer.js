import { logEventNew } from "includes/googleAnalytic";
import React, { useState } from "react";

const AudioPlayer = ({ src, isMobile }) => {
    const [play, setPlay] = useState(false);
    const handleClick = () => {
        play ? document.getElementById("audio_player").pause() : document.getElementById("audio_player").play();
        play ? logEventNew("ram_mandir_audio", "pause", isMobile ? "mobile": "desktop") : logEventNew("ram_mandir_audio", "play", isMobile ? "mobile": "desktop")
        setPlay(!play);
    }
    return (<>
        <div className="aud_wrap">
        <div onClick={handleClick} className={`audio_button ${play ? "playing" : "paused"}`} >
            {!play ? <img src="/images/rammandir/play.svg"/> : <img src="/images/rammandir/pause.svg"/>}
            <>News18 <br/> Pranam SiyaRam</>
            <div className="aud_vol">
                { !play ? <img src="/images/rammandir/unmute.svg"/> : <img src="/images/rammandir/mute.svg"/> }
            </div>
        </div>
        </div>
        <audio id="audio_player" controls loop style={{ visibility: "hidden"}}>
        <source src={src} type="audio/mp3" /> 
            Your browser does not support the audio element.
      </audio>

      <style jsx>{`
      .aud_wrap {
        position: fixed;
        top: 75%;
        right: 7px;
        box-shadow: 0px 3px 6px #00000029;
        border: 1px solid #E17E39;
        border-radius: 6px;
        background-color: #FFF2E8;
        width: 60px;
        height: 105px;
        cursor: pointer;
        z-index: 999;
    }
      .audio_button {
        font-size: 10.5px;
        line-height: 12px;
        color: #000;
        text-transform: uppercase;
        font-weight: bold;
        text-align: center;
      }
        .audio_button > img {
            margin: 5px 0 4px;
        }
        .aud_vol {
            background-color: #E17E39;
            border: 1px solid #E17E39;
            border-radius: 0px 0px 6px 6px;
            width: 58px;
            height: 30px;
            margin-top: 5px;
            padding: 5px 0;
        }

        @media (max-width:768px){
            .aud_wrap{ width: 120px;
                height: 39px;
                right: 0;
                border-radius: 6px 0 0 6px;}    
            .audio_button{     text-align: left;
                padding: 0 0px 3px 5px;
                font-size: 9.5px;
                line-height: 10px;
                display: flex;
                align-items: center;}  
            .audio_button > img {margin: 0 6px 0 0;}
            .aud_vol{margin: 0; height: 37px; padding: 9px 7px;  border-radius: unset; border: 0; width: 32px;}      
            .aud_vol img{width: 18px;
                height: 20px;}
        }

      `}</style>
      </>);
};

export default AudioPlayer;