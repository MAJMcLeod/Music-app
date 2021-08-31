import './Style/FavouritesItem.css'
import { AiOutlineDelete } from 'react-icons/ai'
//importing appropriate react components and stylesheets

let FavouritesItem = ({ track, removeFavourite }) => {
    // passing through a callback function and data using props

    return (
        // returning elements to render to the DOM
        <div className="FavouritesItem">
            <div className="FavInner1">
                <p className="SongName">
                    {track.artist + " - " + track.song}
                    {/* takes the data passed through and renders it */}
                </p>
            </div>
            <div className="FavInner2">
                <div className="DeleteContainer" onClick={() => removeFavourite(track)}>
                    {/* onClick the element will execute the callback function that has
                    been passed through */}
                    <AiOutlineDelete className="Delete" />
                </div>
            </div>
        </div>
    )
}

export default FavouritesItem;
// exporting the component for use in other react components