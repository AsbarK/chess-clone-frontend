import { useState,ReactElement, useEffect } from "react";

export default function ChessBoard() {
    useEffect(()=>{
        parseFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")
    },[])
    const [boardArray,setBoardArray] = useState<ReactElement[]>([])
    // const createRow = (isEvenRow:boolean) => {
    //     const squares = [];
    //     for (let i = 0; i < 8; i++) {
    //         const isEvenSquare = i % 2 === 0;
    //         const isWhiteSquare = isEvenRow ? isEvenSquare : !isEvenSquare;
    //         squares.push(
    //             <div
    //                 key={i}
    //                 className={`w-full h-full ${
    //                     isWhiteSquare ? 'bg-chess-whiteBg' : 'bg-chess-blackBg'
    //                 } border border-black`}
    //             ></div>
    //         );
    //     }
    //     return squares;
    // };
    function grabPeice(e:React.MouseEvent){
        console.log(e.target)
    }
    function parseFEN(str:string){
        const board = []
        const innerBoard = []
        let isWhiteSquare:boolean = true
        for (let i = 0; i < str.length; i++){
            switch (str[i]) {
                case "R":
                case "K":
                case "B":
                case "N":
                case "P":
                case "Q":
                    board.push(<div
                        key={`w${str[i]},${i}`}
                        className={`w-full h-full  ${
                            isWhiteSquare ? 'bg-chess-whiteBg' : 'bg-chess-blackBg'
                        }`}
                    >
                        <div style={{backgroundImage:`url(/assets/w${str[i]}.png)`}} className="w-full h-full bg-no-repeat bg-center cursor-grab active:cursor-grabbing" onMouseDown={grabPeice}></div>
                        </div>)
                    break;     
                case "r":
                case "k":
                case "b":
                case "n":
                case "p":
                case "q":
                    board.push(<div
                        key={`b${str[i]},${i}`}
                        className={`w-full h-full  ${
                            isWhiteSquare ? 'bg-chess-whiteBg' : 'bg-chess-blackBg'
                        }`}
                    >
                        <div style={{backgroundImage:`url(/assets/b${str[i].toUpperCase()}.png)`}} className="w-full h-full bg-no-repeat bg-center cursor-grab active:cursor-grabbing" onMouseDown={grabPeice}></div>
                        {/* <img src={`/assets/b${str[i].toUpperCase()}.png`} className=""/> */}
                    </div>)
                    break;
                case "1":     
                case "2":     
                case "3":     
                case "4":     
                case "5":     
                case "6":     
                case "7":     
                case "8":
                        for(let j =0;j<Number(str[i]);j++){
                            board.push(<div
                                key={`${str[i]},${i},${j}`}
                                className={`w-full h-full ${
                                    isWhiteSquare ? 'bg-chess-whiteBg' : 'bg-chess-blackBg'
                                }`}
                            ></div>)
                            isWhiteSquare = !isWhiteSquare
                        }
                        isWhiteSquare = !isWhiteSquare
                    break; 
                default:
                    break;
            }
            isWhiteSquare = !isWhiteSquare
        }
        setBoardArray(board)
        return true
    }

    return (
        
        <div className="bg-chess-blackBg w-[700px] h-[700px]">
            <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
                {boardArray.map((item, index) => (
                    <div key={index} className="w-full h-full">
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}
