export default function ElectionCards({ children: electioncards, allCities }) {
  // console.log('-----------------------------');
  // console.log(electioncards);
  // console.log(allCities);
  // console.log('-----------------------------');
  
  return (
    <div className="border p-2 flex flex-row items-center justify-center flex-wrap">
      {electioncards}
    </div>
  );
}
