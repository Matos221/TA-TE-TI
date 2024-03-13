import { WINNERS_COMBOS } from "./constantsAndCombos";
export const checkWinnerFrom = (boardToCheck) => {

        // Vemos si "X" / "0" es alguno el ganador con todas las combinaciones gnadoras.
    
        for (const combo of WINNERS_COMBOS) {
    
          const [a, b, c] = combo;
    
          if (
            boardToCheck[a] && // Retorna "X" / "0".
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
          ) {
            return boardToCheck[a] // Devolvera la marca del ganador, "X" / "0".
          }
        }
        // No hay ganador
        return null;
      }