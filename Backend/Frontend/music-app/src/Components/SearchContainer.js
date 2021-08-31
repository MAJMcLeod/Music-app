import './Style/SearchContainer.css'
import { useState } from 'react';
import Favourites from './Favourites'
import { FiSearch } from 'react-icons/fi'
//importing appropriate react components and stylesheets

let SearchContainer = ({ removeFavourite, SearchCallback}) => {
    // passing through data via props

    const [search, setSearch] = useState('')
    // used to store the search query

    return (
        // returning elements to render to the DOM
        <div className="SearchHolder">
            <p className="Title">Music-App</p>
            <div className="SearchContainer">
                <div className="SearchOptions">
                    <input className="SearchBar" placeholder="Search" onChange={e => setSearch(e.target.value)}></input>
                    {/* whenever the searchbar input changes the value or search is updated */}

                    <div className="SearchIconDiv" onClick={() => SearchCallback(search)}>
                        {/* when clicked the element will execute to callback function */}
                        
                        <FiSearch className="Search" />
                    </div>
                </div>
            </div>
            <Favourites removeFavourite={removeFavourite}/>
        </div>
    )
}

export default SearchContainer;
// exporting the component for use in other react components