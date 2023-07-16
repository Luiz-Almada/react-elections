export default function ElectionCard({
  id,
  cityId,
  candidateId,
  votes,
  name,
  totalVotes,
  statusItem,
  candidateName,
}) {
  return (
    <>
    <div className="grid grid-cols-2  shadow-lg p-4 m-2 w-60 h-60 cursor-pointer flex-row items-center justify-center"
>
      <div className="row-span-2 col-span-2 md:col-span-1 justify-left items-left" >
      <img
        src={`../../img/${candidateName}.png`}
        alt="Descrição da imagem"
        className="rounded-full h-20 w-20"
      />
      </div>
      <div className={`col-span-2 md:col-span-1 text-center  flex justify-center items-end h-full text-2xl ${ statusItem === 'Eleito' ? "text-green-700" : "text-yellow-600" } `}>
        {(votes/totalVotes).toLocaleString(undefined, {
          style: 'percent',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
      <div className="col-span-2 md:col-span-1 text-center ">
      {votes.toLocaleString()} votos
      </div>
      <div className="col-span-2 text-center ">
      {candidateName}
      </div>
      <div className={`col-span-2 text-center  ${ statusItem === 'Eleito' ? "text-green-700" : "text-yellow-600" }`}>
      {statusItem}
      </div>
    </div>


    </>
  );
}


