require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
// importing required dependencies 

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
// specifying what the app will use

const SpotifyWebApi = require('spotify-web-api-node')
// importing Spotify API tools


app.post('/refresh', (req, res) => {
    // post request that requests a page refresh as 
    // access token required to make the spotify work is
    // constantly renewed, requiring a refresh token

    const refreshToken = req.body.refreshToken;
    // stores the refresh token on refresh

    const spotifyApi = new SpotifyWebApi({
        // initialising new spotify api component
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        // setting the components variables, these
        // variables are kept in an env file
        refreshToken
    })

    spotifyApi
        .refreshAccessToken()
        // renews the Api access token 
        .then(data => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn,
            })
            // once the data has been fetched from the api 
            // the access token is updated and the time for which 
            // new token expires is changed
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
    // print if there is an arror
})

app.post('/login', (req, res) => {
    const code = req.body.code;
    // saves the authorization code gived by the Spotify API 
    const spotifyApi = new SpotifyWebApi({
        // initialising new spotify api component
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
        // setting the components variables, these
        // variables are kept in an env file
    })

    spotifyApi.authorizationCodeGrant(code)
    // requests an access token from the spotify API using the 
    // authorization code given earlier 
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
                // the returned data is then stored 
            })
        }).catch(() => {
            res.sendStatus(400)
        })
})


app.listen(3001, function () {
    console.log('Listening on port 3001')
})
// listen on port 3001