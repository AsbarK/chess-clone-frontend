import { Chess } from "chess.js"
export const isValidMove = (fen:string,move:{from:string,to:string}) => {
    const chess = new Chess(fen)
    try {
        const result = chess.move(move)
        return result
    } catch (error) {
        return false
    }
}