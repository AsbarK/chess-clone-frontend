import chess_Image from "../Images/chess-Image.png"
export default function Home() {
  return (
    <div className="flex justify-evenly items-center">
      <img src={chess_Image} alt="Chess Image" width={400} height={400} className="p-4"/>
      <a className="" href={`/game/${Date.now()}`}>
        <button className="bg-green-background text-white p-3 rounded-md">Play Online</button>
      </a>
    </div>
  );
}
