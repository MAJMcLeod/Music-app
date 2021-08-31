import './Style/Nav.css'
import {useState, useEffect} from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
//importing appropriate react components and stylesheets

let Nav = ({accessToken, trackUri}) => {
    // passing through the access token and track URI

    const [play, setPlay] = useState(false)
    // used to store whether a track is being played or not

    useEffect(() => setPlay(true), [trackUri])
    // usEffect that sets play to true whenever the component is updated

    if(!accessToken) return null
    // if there is no access token, the function stops here

    return (
        // returning elements to render to the DOM
        <div className="Nav">
            <div className="MusicPlayOuter">
                <div className="TitleDiv">
                        <SpotifyPlayer token={accessToken} 
                         uris={trackUri ? [trackUri] : []}
                         callback={state =>{
                             if(!state.isPlaying) setPlay(false)
                         }}
                         play = {play}/>
                         {/* Spotify player element used to playback specified songs, Spotify 
                         premium is required to make this work and unfortunately I don't have it
                         but I thought it whould be cool to mess around with it anyway */}
                </div>
            </div>
        </div>
    )
}

export default Nav;
// exporting the component for use in other react components