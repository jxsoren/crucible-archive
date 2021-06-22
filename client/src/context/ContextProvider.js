import React, { useState } from 'react'
import axios from 'axios'

export const Context = React.createContext()

const bungieAxios = axios.create({
    baseURL: 'https://www.bungie.net/Platform',
    headers: {"X-API-KEY": "47e71860d17343f397b45aec65da3d89"}
})
bungieAxios.defaults.headers.common["X-API-KEY"] = "47e71860d17343f397b45aec65da3d89";

export const ContextProvider = (props) => {
    // Player Search Logic
        // Init State   
            const initNameVal = {
                playerOne: {
                    val: ''
                },
                playerTwo: {
                    val: ''
                }
            }
            const initUserName = {
                playerOne_username: {
                    username_p1: ''
                },
                playerTwo_username: {
                    username_p2: ''
                }
            }
            const initMembershipId = {
                playerOne_memId: {
                    memId_p1: '',
                },
                playerTwo_memId: {
                    memId_p2: '',
                }
            }
            const initOverallKD = {
                playerOne_ovrKD: {
                    ovrKD_p1: null
                },
                playerTwo_ovrKD: {
                    ovrKD_p2: null
                }
            }
            const initPrivateMatch = {
                playerOne_privKD: {
                    privKD_p1: null
                },
                playerTwo_privKD: {
                    privKD_p2: null
                }
            }
            const initEmblems = {
                playerOne_emblem: {
                    emblem_p1: null
                },
                playerTwo_emblem: {
                   emblem_p2: null
                }
            }
            const initClan = {
                playerOne_clan: {
                    clan_p1: null
                },
                playerTwo_clan: {
                   clan_p2: null
                }
            }
            const initTrials = {
                playerOne_trials: {
                    trials_p1: null
                },
                playerTwo_trials: {
                   trials_p2: null
                }
            }

        //Platform
            const initPlatform = {
                value: 1
            }
        
            // General Player State
            const [ nameVal, setNameVal ] = useState(initNameVal)
            const [ username, setUsername ] = useState(initUserName)
            const [ platform, setPlatform ] = useState(initPlatform)

            // Player Statistics
            const [ overallKD, setOverallKD ] = useState(initOverallKD)
            const [ privateMatch, setPrivateMatch ] = useState(initPrivateMatch)
            const [ trials, setTrials ] = useState(initTrials)

            // Player Banner Card State
            const [ emblem, setEmblem ] =  useState(initEmblems)
            const [ clan, setClan ] = useState(initClan)


        const handleNameChange1 = (e) => {
            const { name, value } = e.target
            setNameVal(prevInputs => ({
                ...prevInputs,
                playerOne: {
                    [name]: value
                }
            }))
        }

        const handleNameChange2 = (e) => {
            const { name, value } = e.target
            setNameVal(prevInputs => ({
                ...prevInputs,
                playerTwo: {
                    [name]: value
                }
            }))
        }

        const handleSelectChange = (e) => {
            setPlatform(prev => ({
                value: e.target.value
            }))
          }
        
        // Saving Player 1 Data
        const getUsername = () => {
            // Player One
            const { playerOne } = nameVal
            bungieAxios.get(`/Destiny2/SearchDestinyPlayer/${platform.value}/${playerOne.val}/`)
                .then(res => setUsername(prev => ({
                    ...prev,
                    playerOne_username: {
                        username_p1: res.data.Response[0].displayName
                    }
                })
                )
            )
            .catch(err => console.log(err))

            //Player Two
            const { playerTwo } = nameVal
            bungieAxios.get(`/Destiny2/SearchDestinyPlayer/${platform.value}/${playerTwo.val}/`)
                .then(res => setUsername(prev => ({
                    ...prev,
                    playerTwo_username: {
                        username_p2: res.data.Response[0].displayName
                    }
                })
                )
            )
            .catch(err => console.log(err))
        }

        
        const getMembershipId = async () => {
            // Player One
            let playerOneMemId
            const { playerOne } = nameVal

            await bungieAxios.get(`/Destiny2/SearchDestinyPlayer/${platform.value}/${playerOne.val}/`)
                .then(res => {
                    playerOneMemId = res.data.Response[0].membershipId
                }) 
                .catch(err => console.log(err))

            // Player Two
            let playerTwoMemId
            const { playerTwo } = nameVal

            await bungieAxios.get(`/Destiny2/SearchDestinyPlayer/${platform.value}/${playerTwo.val}/`)
                .then(res => {
                    playerTwoMemId = res.data.Response[0].membershipId
                }) 
                .catch(err => console.log(err))

                
            console.log(playerOneMemId, playerTwoMemId)
            return {
                playerOneMemId,
                playerTwoMemId
            }
        }

        const getPlayerOneGeneralStats = (memId) => {
            // Overall KD
            bungieAxios(`Destiny2/${platform.value}/Account/${memId}/Character/0/Stats`)
                .then(res => setOverallKD(prev => ({
                    ...prev,
                    playerOne_ovrKD: {
                        ovrKD_p1: res.data.Response.allPvP.allTime.killsDeathsRatio.basic.displayValue
                    }
                }))
                )
        }

        const getPlayerTwoGeneralStats = (memId) => {
            // Overall KD
            bungieAxios(`Destiny2/${platform.value}/Account/${memId}/Character/0/Stats`)
                .then(res => setOverallKD(prev => ({
                    ...prev,
                    playerTwo_ovrKD: {
                        ovrKD_p2: res.data.Response.allPvP.allTime.killsDeathsRatio.basic.displayValue
                    }
                }))
                )
                .catch(err => console.log(err))
        }

        const getPlayerOneBanner = async (memId) => {
            let allCharacters = []
            let allCharactersIds 
            let dateLastPlayed

            // Get dateLastPlayed
            await bungieAxios(`/Destiny2/1/Profile/${memId}/?components=100`)
                .then(res => {
                    dateLastPlayed = res.data.Response.profile.data.dateLastPlayed
                })
                .catch(err => console.log(err))
                
            // Get allCharacterIds
            await bungieAxios(`/Destiny2/1/Profile/${memId}/?components=100`)
                .then(res => {
                    allCharactersIds = res.data.Response.profile.data.characterIds
                })
                .catch(err => console.log(err))

            // Get allCharacters
            await bungieAxios(`/Destiny2/1/Profile/${memId}/?components=200`)
                .then(res => {
                    allCharacters = [res.data.Response.characters.data]
                })
                .catch(err => console.log(err))

               const char1 = allCharactersIds[0]
               const char2 = allCharactersIds[1] 
               const char3 = allCharactersIds[2]  

               const emblemPathChar1 = allCharacters[0][`${char1}`].emblemBackgroundPath
               const emblemPathChar2 = allCharacters[0][`${char2}`].emblemBackgroundPath
               const emblemPathChar3 = allCharacters[0][`${char3}`].emblemBackgroundPath

               // Determine which char was last played & set emblem state to said char emblem
                if(allCharacters[0][`${char1}`].dateLastPlayed === dateLastPlayed){
                    setEmblem(prev => ({
                        ...prev,
                        playerOne_emblem: {
                            emblem_p1: `https://www.bungie.net${emblemPathChar1}`
                        }
                    }))
                    console.log(emblem.playerOne_emblem)
                } else if(allCharacters[0][`${char2}`].dateLastPlayed === dateLastPlayed) {
                     setEmblem(prev => ({
                        ...prev,
                        playerOne_emblem: {
                            emblem_p1: `https://www.bungie.net${emblemPathChar2}`
                        }
                    }))
                    console.log(emblem.playerOne_emblem)
                } else if(allCharacters[0][`${char3}`].dateLastPlayed === dateLastPlayed){
                    setEmblem(prev => ({
                        ...prev,
                        playerOne_emblem: {
                            emblem_p1: `https://www.bungie.net${emblemPathChar3}`
                        }
                    }))
                    console.log(emblem.playerOne_emblem)
                } else {
                    console.log("error")
                }
        }

        const getPlayerTwoBanner = async (memId) => {
            let allCharacters = []
            let allCharactersIds 
            let dateLastPlayed

            // Get dateLastPlayed
            await bungieAxios(`/Destiny2/1/Profile/${memId}/?components=100`)
                .then(res => {
                    dateLastPlayed = res.data.Response.profile.data.dateLastPlayed
                })
                .catch(err => console.log(err))
                
            // Get allCharacterIds
            await bungieAxios(`/Destiny2/1/Profile/${memId}/?components=100`)
                .then(res => {
                    allCharactersIds = res.data.Response.profile.data.characterIds
                })
                .catch(err => console.log(err))

            // Get allCharacters
            await bungieAxios(`/Destiny2/1/Profile/${memId}/?components=200`)
                .then(res => {
                    allCharacters = [res.data.Response.characters.data]
                })
                .catch(err => console.log(err))

               const char1 = allCharactersIds[0]
               const char2 = allCharactersIds[1] 
               const char3 = allCharactersIds[2]  

               const emblemPathChar1 = allCharacters[0][`${char1}`].emblemBackgroundPath
               const emblemPathChar2 = allCharacters[0][`${char2}`].emblemBackgroundPath
               const emblemPathChar3 = allCharacters[0][`${char3}`].emblemBackgroundPath

               // Determine which char was last played & set emblem state to said char emblem
                if(allCharacters[0][`${char1}`].dateLastPlayed === dateLastPlayed){
                    setEmblem(prev => ({
                        ...prev,
                        playerTwo_emblem: {
                            emblem_p2: `https://www.bungie.net${emblemPathChar1}`
                        }
                    }))
                    console.log(emblem.playerOne_emblem)
                } else if(allCharacters[0][`${char2}`].dateLastPlayed === dateLastPlayed) {
                     setEmblem(prev => ({
                        ...prev,
                        playerTwo_emblem: {
                            emblem_p2: `https://www.bungie.net${emblemPathChar2}`
                        }
                    }))
                    console.log(emblem.playerOne_emblem)
                } else if(allCharacters[0][`${char3}`].dateLastPlayed === dateLastPlayed){
                    setEmblem(prev => ({
                        ...prev,
                        playerTwo_emblem: {
                            emblem_p2: `https://www.bungie.net${emblemPathChar3}`
                        }
                    }))
                    console.log(emblem.playerOne_emblem)
                } else {
                    console.log("error")
                }
        }

        const getPlayerOneClan = (memId) => {
            bungieAxios(`/GroupV2/User/${platform.value}/${memId}/0/${platform.value}/`)
                .then(res => setClan(prev => ({
                    ...prev,
                    playerOne_clan: {
                        clan_p1: res.data.Response.results[0].group.name
                    }
                }))
                )
        }

        const getPlayerTwoClan = (memId) => {
            bungieAxios(`/GroupV2/User/${platform.value}/${memId}/0/${platform.value}/`)
                .then(res => setClan(prev => ({
                    ...prev,
                    playerTwo_clan: {
                        clan_p2: res.data.Response.results[0].group.name
                    }
                }))
                )
        }


        async function getUserData(){
            const fetchMembershipId = await getMembershipId()
            getUsername(fetchMembershipId)
            getPlayerOneGeneralStats(fetchMembershipId.playerOneMemId)
            getPlayerTwoGeneralStats(fetchMembershipId.playerTwoMemId)

            getPlayerOneBanner(fetchMembershipId.playerOneMemId)
            getPlayerTwoBanner(fetchMembershipId.playerTwoMemId)

            getPlayerOneClan(fetchMembershipId.playerOneMemId)
            getPlayerTwoClan(fetchMembershipId.playerTwoMemId)
        }

        const handleNameSubmit = async (e) => {
            e.preventDefault()
            
            getUserData().catch(err => console.log(err))
        }
                
    return(
        <Context.Provider
            value={
                {
                    handleNameChange1,
                    handleNameChange2,
                    handleNameSubmit,
                    handleSelectChange,
                    nameVal,
                    bungieAxios,
                    ...username,
                    ...overallKD,
                    ...emblem,
                    ...clan
                }
            }
        >
            {props.children}
        </Context.Provider>
    )
}

export { bungieAxios }

// None: 0
// Story: 2
// Strike: 3
// Raid: 4
// AllPvP: 5
// Patrol: 6
// AllPvE: 7
// Reserved9: 9
// Control: 10
// Reserved11: 11
// Clash: 12
// Clash -> Destiny's name for Team Deathmatch. 4v4 combat, the team with the highest kills at the end of time wins.
// Reserved13: 13
// CrimsonDoubles: 15
// Nightfall: 16
// HeroicNightfall: 17
// AllStrikes: 18
// IronBanner: 19
// Reserved20: 20
// Reserved21: 21
// Reserved22: 22
// Reserved24: 24
// AllMayhem: 25
// Reserved26: 26
// Reserved27: 27
// Reserved28: 28
// Reserved29: 29
// Reserved30: 30
// Supremacy: 31
// PrivateMatchesAll: 32
// Survival: 37
// Countdown: 38
// TrialsOfTheNine: 39
// Social: 40
// TrialsCountdown: 41
// TrialsSurvival: 42
// IronBannerControl: 43
// IronBannerClash: 44
// IronBannerSupremacy: 45
// ScoredNightfall: 46
// ScoredHeroicNightfall: 47
// Rumble: 48
// AllDoubles: 49
// Doubles: 50
// PrivateMatchesClash: 51
// PrivateMatchesControl: 52
// PrivateMatchesSupremacy: 53
// PrivateMatchesCountdown: 54
// PrivateMatchesSurvival: 55
// PrivateMatchesMayhem: 56
// PrivateMatchesRumble: 57
// HeroicAdventure: 58
// Showdown: 59
// Lockdown: 60
// Scorched: 61
// ScorchedTeam: 62
// Gambit: 63
// AllPvECompetitive: 64
// Breakthrough: 65
// BlackArmoryRun: 66
// Salvage: 67
// IronBannerSalvage: 68
// PvPCompetitive: 69
// PvPQuickplay: 70
// ClashQuickplay: 71
// ClashCompetitive: 72
// ControlQuickplay: 73
// ControlCompetitive: 74
// GambitPrime: 75
// Reckoning: 76
// Menagerie: 77
// VexOffensive: 78
// NightmareHunt: 79
// Elimination: 80
// Momentum: 81
// Dungeon: 82
// Sundial: 83
// TrialsOfOsiris: 84