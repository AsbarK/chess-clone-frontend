import { useNavigate } from "react-router-dom"
export default function Home({socket}:{socket:WebSocket}) {
    const navigate = useNavigate()
  return (
      <div className="flex justify-evenly items-center">
      <img src={"/chess-Image.png"} alt="Chess Image" width={400} height={400} className="p-4"/>
        <button className="bg-chess-whiteBg text-white p-3 rounded-md" onClick={()=>{
            socket?.send(JSON.stringify({
                "type":"init_game"
            }))
            socket.onmessage = (e)=>{
                const data = JSON.parse(e.data)
                if(data.type === "init_game"){
                    data.payload.color === "b"?navigate(`/game/${data.gameId}?black=true`):navigate(`/game/${data.gameId}`)
                }
            }
        }}>Play Online</button>
    </div>
  )
}