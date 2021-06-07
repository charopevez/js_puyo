import React from 'react'

const PlayerHint = (props) => {
    return (
        <canvas className={"plHint"+props.class} width={50} height={50}>   
        </canvas>
    )
}

export default PlayerHint
