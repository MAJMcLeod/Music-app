import './Style/Login.css'
import {GrSpotify} from 'react-icons/gr'
//importing appropriate react components and stylesheets


const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=1d0da610ffee473cadc359df2f1e06f8&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
// link used to redirect the user to a spotify login page

export default function Login() {
    return (
        // returning elements to render to the DOM
        <div className="Login" >
            <div className="LoginInner">
                <GrSpotify className="GrSpotify"/>
                <a className="LoginLink" href={AUTH_URL}>
                    Login With Spotify
                </a>
            </div>
        </div>
    )
}