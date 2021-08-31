import './Style/Favourites.css'
import FavouritesItem from './FavouritesItem'
//importing appropriate react components and stylesheets

let Favourites = ({ removeFavourite }) => {
    // passing through a callback function using props

    const favourites = JSON.parse(sessionStorage.getItem('favItems'));
    // takes in the favItems array from session storage which stores
    // all the users favourite tracks from that session

    return (
        // returning elements to render to the DOM

        <div className="FavouritesOuter">
            <div className="Favourites">
                <div className="FavSpacer">
                    <p className="FavText">
                        Favourites
                    </p>
                </div>
                <div className="FavouritesInner">
                    <div className="FavContainer">
                        {!favourites ? null
                            // conditional render statement that checks to see if
                            // any data is stored in session storage, if not then nothing is
                            // rendered

                            : favourites.map(track =>
                                <FavouritesItem removeFavourite={removeFavourite} track={track} key={track.uri} />
                                // function that maps through the session storage array and
                                // renders each items respective FavouritesItem component 
                                
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favourites;
// exporting the component for use in other react components