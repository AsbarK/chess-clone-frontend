import ChessBoard from "../helper/chessBoard"
export default function GamePage({socket}:{socket:WebSocket}){
    return(
        <div>
            <ChessBoard socket={socket}></ChessBoard>
        </div>
    )
}