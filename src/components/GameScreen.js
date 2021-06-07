import React from 'react'
import GameField from './GameField'
import GameSettings from './GameSettings'
import PropTypes from 'prop-types'
import "../styles/gamescreen.scss"


const GameScreen = (props) => {
    return (
        // <div className="gameScreen">
        //     <GameField/>
        //     <GameSettings />
        //     {props.className!==1 && <GameField class={props.className}/>}
        // </div>
        <div id="game"></div>
    )
}

GameScreen.defaultProps = {
    //default settings
    gameMode:1, 
    settings:{
    }

}

GameScreen.propTypes = {
    gameMode:PropTypes.oneOf([1, 2, 3]).isRequired, // [1:One Player, 2: Two Player, 3: Player vs AI]

}


export default GameScreen
