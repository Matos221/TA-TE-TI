export const checkEndGameFrom = (newBoard) => {

        // Con la función "every" verificamos que cada uno de los cuadrados este vacio, asi habra empate. 
        return newBoard.every((Square) => Square !== null)
}