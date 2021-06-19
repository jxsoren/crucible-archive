import React, { useContext } from 'react'
import { SearchBar } from '../SearchBar/SearchBar.js'
import { Context } from '../../context/ContextProvider.js'

export const Home = () => {
    const { 
        playerOne_username, 
        playerTwo_username,
        playerOne_ovrKD,
        playerTwo_ovrKD,
        playerOne_privKD,
        playerTwo_privKD
    } = useContext(Context)

    console.log(playerOne_username.username_p1)
    return(
        <div>  
            <SearchBar />

            <h1>Player One</h1>
                <p>Username: {playerOne_username.username_p1}</p>
                <p>Overall KD: {playerOne_ovrKD.ovrKD_p1}</p>
            <h1>Player Two</h1>
                <p>Username: {playerTwo_username.username_p2}</p>
                <p>Overall KD: {playerTwo_ovrKD.ovrKD_p2}</p>
        </div>
    )
}
