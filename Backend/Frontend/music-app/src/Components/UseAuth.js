import {
    useState,
    useEffect
} from 'react';
import axios from 'axios';
//importing appropriate react components and dependencies

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();
    // useStates that store information that is crucial for the 
    // spotify API to work such ass accesstoken and refreshtoken

    useEffect(() => {
        axios.post('http://localhost:3001/login', {
            // axios has a library used to communicate with API's making 
            // requests easier to code and manage

            code,
            // takes in the code provided by spotify and makes a request
            // to the API with it 
            
        }).then(res => {
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
            // once the request has been made and the promise has been
            // fulfilled each value is updated 
            window.history.pushState({}, null, '/')
            // code that hides the long http query in the searchbar
            // making everything look cleaner and simple
        }).catch(() => {
            window.location = '/'
        })
    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        // if there is no refresh token or expiry then the function
        // will stop here

        const interval = setInterval(() => {
            // used to set an interval in which the page will reload
            axios.post('http://localhost:3001/refresh', {
                refreshToken,
                // makes another request in which the request asks
                // the spotify API to refresh the page as the access token
                // token only lasts for so long meaning it needs to be 
                // renewed
            }).then(res => {
                setAccessToken(res.data.accessToken);
                setExpiresIn(res.data.expiresIn);
                // once the data has been retreved the expiry is renewed and
                // access token updated
            }).catch(() => {
                window.location = '/'
            })
        }, (expiresIn - 60) * 1000)
        // the intrval in which this code will run

        return () => clearInterval(interval);
        // once all this has run, the interval will be reset 
        // and will run from 0

    }, [refreshToken, expiresIn]);

    return accessToken;
    // returns the access token
}