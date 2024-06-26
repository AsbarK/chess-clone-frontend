import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { useSocket } from "./hooks/useSocket";
import ChessBoard from "./helper/chessBoard";

function App() {
  const socket = useSocket()
  if(!socket) {return <div>Connecting!!!</div>}
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home socket={socket}/>}/>
        <Route path="/game/:gameId" element={<ChessBoard socket={socket}/>}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
