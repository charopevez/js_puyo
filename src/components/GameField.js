import React from 'react'
import "../styles/gamescreen.scss"
import PlayerField from './PlayerField'
import PlayerHint from './PlayerHint'
import PlayerScore from './PlayerScore'

const GameField = (props) => {
    return (
        <div className={"field"+props.class}>
            <PlayerField class={props.class}/>
            <PlayerHint class={props.class}/>
            <PlayerScore class={props.class}/>
        </div>

    )
}
GameField.defaultProps = {
    //default settings
    class:"", 
    settings:{
    }

}

export default GameField;
