import ChessBoard from "../helper/chessBoard";


export default function Page({params}:{params:{roomId:string}}){
    return(
        <div>
            {params.roomId}
            <ChessBoard></ChessBoard>
        </div>
    )
}