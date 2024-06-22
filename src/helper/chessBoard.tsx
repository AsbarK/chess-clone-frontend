import React, { useState, ReactElement, useEffect, useRef } from "react";
import EachBox from "./eachBox";
import { isValidMove } from "./chess/chessValidation";

const GridSize = 81;

export default function ChessBoard() {
    const [boardArray, setBoardArray] = useState<ReactElement[][]>([]);
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [grabPosition, setGrabPosition] = useState<{ x: number, y: number } | null>(null);
    const chessBoardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        parseFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    }, []);

    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        const chessboard = chessBoardRef.current;
        // console.log(element)
        if (element.id === "chess-piece" && chessboard) {
            const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GridSize);
            const grabY = Math.abs(Math.floor((e.clientY - chessboard.offsetTop ) / GridSize));

            element.style.position = "absolute";
            // console.log(element)
            // element.style.zIndex = "100"
            // element.style.left = `${x}px`;
            // element.style.top = `${y}px`;
            // const x = e.clientX-(GridSize/2);
            // const y = e.clientY-(GridSize/2);

            // console.log(x,y)
            setGrabPosition({x:grabX,y:grabY})
            setActivePiece(element)
        }

    }

    function movePiece(e: React.MouseEvent) {
        const chessboard = chessBoardRef.current;
        // console.log(activePiece,chessboard)
        if (activePiece && chessboard) {
            // console.log(e.clientX,e.clientY)
            // console.log(activePiece.style.left,activePiece.style.top,activePiece)
                const minX = chessboard.offsetLeft-(GridSize/4);
                const minY = chessboard.offsetTop-(GridSize/4);
                const maxX = chessboard.offsetLeft + chessboard.clientWidth - (GridSize*3/4);
                const maxY = chessboard.offsetTop + chessboard.clientHeight - (GridSize*3/4);
                const x = e.clientX - GridSize / 2;
                const y = e.clientY - GridSize / 2;
                activePiece.style.position = "absolute";
    
                if (x < minX) {
                    activePiece.style.left = `${minX}px`;
                } else if (x > maxX) {
                    activePiece.style.left = `${maxX}px`;
                } else {
                    activePiece.style.left = `${x}px`;
                }
    
                if (y < minY) {
                    activePiece.style.top = `${minY}px`;
                } else if (y > maxY) {
                    activePiece.style.top = `${maxY}px`;
                } else {
                    activePiece.style.top = `${y}px`;
                }
        }
    }

    function releasePiece(e: React.MouseEvent) {
        const chessboard = chessBoardRef.current;
        if (activePiece && chessboard && grabPosition) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / GridSize);
            const y = Math.abs(Math.floor((e.clientY - chessboard.offsetTop) / GridSize));

            const newBoardArray = [...boardArray];
            console.log(`${String.fromCharCode(97+x)}`,Math.abs(8-y))
            console.log(`${String.fromCharCode(97+grabPosition.x)}`,Math.abs(8-grabPosition.y))
            // console.log(newBoardArray[y][x])
            if(isValidMove("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",{"from":String(`${String.fromCharCode(97+grabPosition.x)}${Math.abs(8-grabPosition.y)}`),"to":String(`${String.fromCharCode(97+x)}${Math.abs(8-y)}`)})){
                const piece = newBoardArray[grabPosition.y][grabPosition.x].props.children;
                newBoardArray[grabPosition.y][grabPosition.x] = (
                    <EachBox
                        uniqKey={newBoardArray[grabPosition.y][grabPosition.x].props.uniqKey}
                        isWhiteSquare={newBoardArray[grabPosition.y][grabPosition.x].props.isWhiteSquare}
                    >
                    </EachBox>
                );
                newBoardArray[y][x] = (
                    <EachBox
                        uniqKey={newBoardArray[y][x].props.uniqKey}
                        isWhiteSquare={newBoardArray[y][x].props.isWhiteSquare}
                    >
                        {piece}
                    </EachBox>
                );
                setBoardArray(newBoardArray);
            }
            else{
                activePiece.style.removeProperty("top");
                activePiece.style.removeProperty("left");
            }
            setActivePiece(null);
        }
    }

    function parseFEN(str: string) {
        const rows = str.split('/');
        const board: ReactElement[][] = [];

        let isWhiteSquare = true;

        for (let row = 0; row < rows.length; row++) {
            const currentRow: ReactElement[] = [];
            for (let col = 0; col < rows[row].length; col++) {
                const char = rows[row][col];
                switch (char) {
                    case "R":
                    case "K":
                    case "B":
                    case "N":
                    case "P":
                    case "Q":
                        currentRow.push(
                            <EachBox
                                uniqKey={`w${char}${row}${col}`}
                                isWhiteSquare={isWhiteSquare}
                            >
                                <div
                                    style={{ backgroundImage: `url(/assets/w${char}.png)` }}
                                    className="w-[80px] h-[80px] bg-no-repeat bg-center cursor-grab active:cursor-grabbing"
                                    id="chess-piece"
                                ></div>
                            </EachBox>
                        );
                        isWhiteSquare = !isWhiteSquare;
                        break;
                    case "r":
                    case "k":
                    case "b":
                    case "n":
                    case "p":
                    case "q":
                        currentRow.push(
                            <EachBox
                                uniqKey={`b${char}${row}${col}`}
                                isWhiteSquare={isWhiteSquare}
                            >
                                <div
                                    style={{ backgroundImage: `url(/assets/b${char.toUpperCase()}.png)` }}
                                    className="w-[80px] h-[80px] bg-no-repeat bg-center cursor-grab active:cursor-grabbing"
                                    id="chess-piece"
                                ></div>
                            </EachBox>
                        );
                        isWhiteSquare = !isWhiteSquare;
                        break;
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8": {
                        const emptySquares = parseInt(char, 10);
                        for (let i = 0; i < emptySquares; i++) {
                            currentRow.push(
                                <EachBox
                                    uniqKey={`e${row}${i}`}
                                    isWhiteSquare={isWhiteSquare}
                                >
                                </EachBox>
                            );
                            isWhiteSquare = !isWhiteSquare;
                        }
                        break;
                    }
                    default:
                        break;
                }
            }
            board.push(currentRow);
            isWhiteSquare = !isWhiteSquare;
        }

        setBoardArray(board);
    }

    return (
        <div className="bg-chess-blackBg w-[648px] h-[648px] " ref={chessBoardRef}>
            <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
                {boardArray.flat().map((item, index) => (
                    <div key={index} className="w-full h-full hover:border hover:border-chess-whiteBg" onMouseDown={grabPiece}
                    onMouseMove={movePiece}
                    onMouseUp={releasePiece}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}
