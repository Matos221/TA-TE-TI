import React from 'react'

// Creamos un mini componente dentro de App.jsx, que se llamara "Squarem", para renderizar cada uno de los cuadritos a usar.

export function Square ({ children, isSelected, updateBoard, index }) {
        const className = `square ${isSelected ? 'is-selected' : ''} `

        const handleClick = () => {

                updateBoard(index)
        }

        return (

                <div className={className} onClick={handleClick} >
                        {children}
                </div>
        )
}
