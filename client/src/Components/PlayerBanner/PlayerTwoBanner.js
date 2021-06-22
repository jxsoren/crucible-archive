import React, { useContext } from 'react';
import { Context } from '../../context/ContextProvider.js'

export const PlayerTwoBanner = (props) => {
    const { playerTwo_emblem, playerTwo_clan } = useContext(Context);
    return (
        <div>
            <img style={{ height:60, width:260 }} src={playerTwo_emblem.emblem_p2} alt='emblem'/>
            <p>Clan: {playerTwo_clan.clan_p2}</p>
        </div>
    )
}