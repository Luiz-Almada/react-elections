export default function ElectionCards({ children: electioncards, allCities }) {
 
  return (
    <div className="border p-2 flex flex-row items-center justify-center flex-wrap">
      {electioncards}
    </div>
  );
}
