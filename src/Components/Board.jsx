import React from 'react'
import { Square } from './Square'


export const Board = ({board, updateBoard}) => {
        return (
                // mapeamos todos los "Squares" empezando por el de la posción 0. 
                board.map((square, index) => {

                        return (
                                <Square key={index}
                                        index={index}
                                        updateBoard={updateBoard}
                                >
                                        {board[index]}
                                </Square>
                        )
                })
        )
}
