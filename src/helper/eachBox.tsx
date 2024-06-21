
export default function EachBox({children,uniqKey,isWhiteSquare}:{children?:React.ReactNode,uniqKey:string,isWhiteSquare:boolean}){
    
    return(
        <div key={uniqKey} className={`w-full h-full ${isWhiteSquare ? 'bg-chess-whiteBg' : 'bg-chess-blackBg'}`}>
            {children}
        </div>
    )
}