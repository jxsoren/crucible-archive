import React, { useContext } from 'react'
import { Context } from '../../context/ContextProvider.js'

export const SearchBar = () => {
    const { handleNameChange1, handleNameChange2, handleNameSubmit, nameVal, handleSelectChange, platform } = useContext(Context)

    return (
        <div>
            <form
                id="search-bar-form"
                onSubmit={handleNameSubmit}
            >
                <input
                    type="text"
                    id="search-bar"
                    placeholder="Gamertag"
                    name="val"
                    onChange={handleNameChange1}
                    value={nameVal.playerOne.val}
                />

                <input
                    type="text"
                    id="search-bar"
                    placeholder="Gamertag"
                    name="val"
                    onChange={handleNameChange2}
                    value={nameVal.playerTwo.val}
                />

            <label>
                Chose your platform:
                <select value={platform} onChange={handleSelectChange}>
                    <option value={0}>None</option>
                    <option value={1}>Xbox</option>
                    <option value={2}>Playstation</option>
                    <option value={3}>Steam</option>
                    <option value={4}>Stadia</option>
                </select>
            </label>

                <button
                    type="button"
                    onClick={handleNameSubmit}
                >
                    Submit
                </button>

            </form>
        </div>
    )
}