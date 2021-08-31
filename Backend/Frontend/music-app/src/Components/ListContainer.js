import './Style/ListContainer.css'
import ListItem from './ListItem'
//importing appropriate react components and stylesheets

let ListContainer = ({ results, selectTrack, addFavourite }) => {
    // passing through callback functions and data using props

    return (
        // returning elements to render to the DOM
        <div className="ListContainer">
            <div className="ListContainerOuter" >
                <div className="ListContainerList">
                    <div className="Spacer">
                    </div>
                    {results.map(track => (
                        <ListItem track={track} key={track.uri} selectTrack={selectTrack} addFavourite={addFavourite} />
                        // function that maps through the results array and
                        // renders each items respective ListItem component 
                    ))}
                    <div className="Spacer2">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListContainer;
// exporting the component for use in other react components