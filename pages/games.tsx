import { connectToDatabase } from "../util/mongodb";
export default function Movies({ games }) {
  return (
    <div>
      <h1>Top 20 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
        {games.map((game, idx) => (
          <div key={idx}>
            <li>
              <img src={game.cover_url} />
              <h2>{game.name}</h2>
              <h3>{game.summary}</h3>
              <p>{game.url}</p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const games = await db
    .collection("games")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();
  return {
    props: {
      games: JSON.parse(JSON.stringify(games)),
    },
  };
}
