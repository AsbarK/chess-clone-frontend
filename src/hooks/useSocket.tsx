import { useEffect, useState } from "react"

export function useSocket(){
    const [socket,setSocket] = useState<WebSocket | null>(null)
    useEffect(()=>{
        const ws = new WebSocket("ws://localhost:8000")
        ws.onopen = ()=> {setSocket(ws),console.log("websocket Connected")}
        ws.onclose = ()=>{setSocket(null),console.log("websocket disconnected")}
        return ()=>{
            ws.close()
        }
    },[])
    return socket
}