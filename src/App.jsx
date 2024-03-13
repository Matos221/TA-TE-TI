import { useState } from 'react'

import { TURNS } from './Logic/constantsAndCombos'
import { checkWinnerFrom } from './Logic/checkWinner'
import { checkEndGameFrom } from './Logic/checkEndGame'
import { resetGameStorage, saveGameToStorage } from './Logic/storage'

import { WinnerModal } from './Components/WinnerModal'
import { Square } from './Components/Square'
import { Board } from './Components/Board'


import './App.css'
import confetti from 'canvas-confetti'


function App() {

  // Creamos dos estados, uno para la tabla, asi se podra ir modficando durante el juego. 
  const [board, setBoard] = useState(() => {

    const boardFromStorage = window.localStorage.getItem('board')

    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  }
  )

  // Y otro para los turnos, de esa forma cambiara entre "X" e "0".
  const [turn, setTurn] = useState(() => {

    const turnFromStorage = window.localStorage.getItem('turn');

    // Con el "??" se verifica que sea null o undefined
    return turnFromStorage ?? TURNS.X;
  })
  // Si hay null no hay ganador, false es que hay empate.
  const [winner, setWinner] = useState(null)

  // Con esta función se actualizara el "board", dependiendo que turno toca.

  const updateBoard = (index) => {

    // No actualizar board en esta posción, si es que ya hay algo.

    if (board[index] || winner) return

    // Actualizamos el board con las marcas hechas.

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Actualizamos el turno.

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)

    // Guardar partida, usando funciones del "DOM", con "localStorage" guardaremos info del elemento window.
    saveGameToStorage({ board: newBoard, turn: newTurn })


    // Vemos quien gano.
    const newWinner = checkWinnerFrom(newBoard);

    if (newWinner) {
      confetti()
      return setWinner(newWinner)
    }

    else if (checkEndGameFrom(newBoard)) return setWinner(false)
  }

  // Con esta función se RESETEA todo el lienzo.
  const resetGame = () => {

    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    // Reseteamos el Storage cuando se termina la partida.
    resetGameStorage()

  }

  return (
    <main className='board'>
      <h1>TA TE TI</h1>

      <button onClick={resetGame}>Reset del juego</button>

      <section className='game'>
        <Board board={board} updateBoard={updateBoard}></Board>
      </section>

      <section className='turn'>

        <Square isSelected={turn === TURNS.X} >{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}  >{TURNS.O}</Square>

      </section>

      <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>

    </main>
  )
}

export default App
