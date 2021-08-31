import './Style/ListItem.css'
import { AiOutlineStar } from 'react-icons/ai'
import { FaPlay } from 'react-icons/fa'
//importing appropriate react components and stylesheets

let ListItem = ({ track, selectTrack, addFavourite }) => {
    // passing through callback functions and data using props

    function handlePlay() {
        selectTrack(track);
    }
    // function that runs a callback funtion that passes
    // data back to the parent

    function handleFavourite() {
        addFavourite(track)
    }
    // function that runs a callback funtion that passes
    // data back to the parent

    return (
        // returning elements to render to the DOM
        <div className='ListItem' style={{ backgroundImage: `url(${track.albumCover})`, backgroundPosition: 'center', backgroundSize: '200px' }}>
            {/* inline styling used to give each component a background image */}
            <AiOutlineStar className="Favourite" onClick={handleFavourite} />
            <FaPlay className="PlayButton" onClick={handlePlay} />
            <div className="InfoContainer">
                <p className="ArtistName">{track.artist}</p>
                <p className="AlbumName">{track.song}</p>
                {/* takes the data passed through and renders it */}
            </div>
        </div>
    )
}

export default ListItem;
// exporting the component for use in other react components