

interface eachBox{
    blackBackGroundColour:boolean;
    peice:string;
}
export default function EachBox({blackBackGroundColour,peice}:eachBox){
    return(
        blackBackGroundColour ? (<div className="w-2 h-2 bg-chess-black">
            <img src={peice} alt="Peice" width={10} height={10}/>
        </div>) : <div className="w-2 h-2 bg-chess-white">
        <img src={peice} alt="Peice" width={10} height={10}/>
    </div>
    )
}