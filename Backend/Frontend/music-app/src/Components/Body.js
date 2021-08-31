import './Style/Body.css'
import { useState, useEffect } from 'react'
import ListContainer from './ListContainer'
import SearchContainer from './SearchContainer'
import useAuth from './UseAuth'
import Nav from './Nav'
import SpotifyWebApi from 'spotify-web-api-node'
//importing appropriate react components and stylesheets

const spotifyApi = new SpotifyWebApi({
    clientId: '1d0da610ffee473cadc359df2f1e06f8'
})
//Initialising a new SpotifyApi component and giving it a unique client id  
// in order to verify identity

let Body = ({ code }) => {
    // use of hooks to pass through the access token recieved by the parent component
    const accessToken = useAuth(code)
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [selectedTrack, setSelectedTrack] = useState()
    const [favourites, setFavourites] = useState(JSON.parse(sessionStorage.getItem('favItems')))
    // use of useState to store information and update the Body component when information is changed

    function addFavourite(track) {
        window.sessionStorage.setItem("favItems", JSON.stringify([...favourites, track]));
        setFavourites([...favourites, track])
    }
    // function that takes in a track object and saves it to session storage and favourites array along
    // with all previous entries in the previous favourites array

    function removeFavourite(key) {
        window.sessionStorage.setItem("favItems", JSON.stringify(favourites.filter(track => track.uri !== key.uri)));
        setFavourites(favourites.filter(track => track.uri !== key.uri));
    }
    // function that takes in a track(key) and filters the favourites array by comparing each entries uri to the track's uri
    // and removing whichever entry matches the uri. It then updates the array and saves it to session storage and favourites array

    function selectTrack(track) {
        setSelectedTrack(track)
    }
    // function that takes in a track and updates the selectTrack useState

    useEffect(() => {
        // useEffect executes everytime the component updates
        if (!accessToken) return
        // if no access token is present then the code will stop here
        spotifyApi.setAccessToken(accessToken)
        // sets the access token for the spotifyApi so that it can be used
    }, [accessToken])

    useEffect(() => {
        if (!search) return setResults([])
        // if there is nothing in search then the function will stop and make
        // the results array empty
        if (!accessToken) return
        // if no access token is present then the code will stop here

        spotifyApi.searchTracks(search).then(res => {
            // search function of the spotifyApi in which you pass a string and
            // it searches accordingly

            setResults(res.body.tracks.items.map(track => {
                // takes the result from the Api and maps out the items into
                // track objects that are then stored in results for rendering
                return {
                    artist: track.artists[0].name,
                    uri: track.uri,
                    song: track.name,
                    albumCover: track.album.images[0].url
                    // extracting the appropriate data from the results
                    // and storing them 
                }
            }))
        })
    }, [search, accessToken])

    let SearchCallback = (searchInput) => {
        setSearch(searchInput);
    }
    // callback function that takes the search string from the search child component
    // and saves it in the search useState

    return (
        // returning elements to render to the DOM
        <div className="Body">
            <Nav accessToken={accessToken} trackUri={selectedTrack?.uri} />
            {/* passing data via props to child elements for use in functions */}

            <div className="BodyInner">
                <SearchContainer SearchCallback={SearchCallback} removeFavourite={removeFavourite} />
                {/* passing functions via props to child elements for use in callbacks */}
                <ListContainer results={results} selectTrack={selectTrack} addFavourite={addFavourite} />
            </div>

            <div className="Background">
                <div className="Pattern">
                </div>
            </div>
        </div>
    )
}

export default Body;
// exporting the component for use in other react components