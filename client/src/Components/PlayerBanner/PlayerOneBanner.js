import React, { useContext } from 'react';
import { Context } from '../../context/ContextProvider.js'

export const PlayerOneBanner = (props) => {
    const { playerOne_emblem, playerOne_clan } = useContext(Context);
    return (
        <div>
            <img style={{ height:60, width:260 }} src={playerOne_emblem.emblem_p1} alt='emblem'/>
            <p>Clan:{playerOne_clan.clan_p1}</p>
        </div>
    )
}