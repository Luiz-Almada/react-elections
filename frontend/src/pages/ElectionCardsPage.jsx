//import { getNewId } from '../services/idService';
import { useEffect, useState} from 'react';

import Error from '../components/Error';
import ElectionCard from '../components/ElectionCard';
import ElectionCards from '../components/ElectionCards';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Main from '../components/Main';
import Item from '../components/Item';

import {
  apiGetAllCandidates,
  apiGetAllCities,
  apiGetAllElection,
} from '../services/apiService';

export default function FlashCardsPage() {
  // Back End
  const [allCities, setAllCities] = useState([]);
  const [allElection, setAllElection] = useState([]);
  const [allCandidates, setAllCandidates] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Front End
  const [filterCity, setFilterCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  //const [opcaoSelecionada, setOpcaoSelecionada] = useState([]);
  const [filterCandidatesCity, setFilterCandidatesCity] = useState([]);



  useEffect(() => {
    async function getAllCandidates() {
      try {
        const backEndAllCandidates = await apiGetAllCandidates();
        setAllCandidates(backEndAllCandidates);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    }

    async function getAllCities() {
      try {
        const backEndAllCities = await apiGetAllCities();
        setAllCities(backEndAllCities);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    }

    async function getAllElection() {
      try {
        const backEndAllElection = await apiGetAllElection();
        setAllElection(backEndAllElection);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
    }

    getAllCandidates();
    getAllCities();
    getAllElection();
  }, []);

  useEffect(() => {
    function handleFilterCity(){
      let result;
        
      if (selectedCity && selectedCity.length > 0){
        result = allCities.filter(item => item.id === selectedCity);
      } else {
        result = allCities
      }
      setFilterCity(result[0]);
      // console.log(result[0])
      //console.log(filterCity)
      
      }
    
      handleFilterCity()

  }, [allCities, selectedCity]);

  useEffect(() => {
    function handleFilterElectionCandidateByCityId(){
      let result1;
      
      if (selectedCity && selectedCity.length > 0){
        //result1 = allElection.filter(item => item.cityId === selectedCity).sort((a, b) => b.votes - a.votes).map((item, index) => { return {...item, statusItem: (index === 0 ? 'Eleito' : 'Não leito') } });

        result1 = allElection.filter(item => item.cityId === selectedCity).sort((a, b) => b.votes - a.votes).map((item, index) => { return {...item, statusItem: (index === 0 ? 'Eleito' : 'Não leito') } }).map(election => {
          const candidate = allCandidates.find(candidate => candidate.id === election.candidateId);
          const name = candidate ? candidate.name : '';
          return {
            ...election,
            candidateName: name
          };
        });

      } else {
        result1 = allElection.filter(item => item.cityId === allCities[0].id).sort((a, b) => b.votes - a.votes).map((item, index) => { return {...item, statusItem: (index === 0 ? 'Eleito' : 'Não leito') } }).map(election => {
          const candidate = allCandidates.find(candidate => candidate.id === election.candidateId);
          const name = candidate ? candidate.name : '';
          return {
            ...election,
            candidateName: name
          };
        });
      }
      setFilterCandidatesCity(result1);
    }
    


      handleFilterElectionCandidateByCityId()

  }, [allCandidates, allElection, selectedCity, allCities]);


  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading && !error) {
    mainJsx = (
      <>
        <div className='text-center text-lg m-2 font-bold'>Eleição em {filterCity.name}</div>
        <div className='text-center space-x-4 m-2'>
          <Item label='Total de eleitores: '>{filterCity? filterCity.votingPopulation: ''}</Item> 
          <Item label='Abstenção: '>{filterCity? filterCity.absence: ''}</Item> 
          <Item label='Comparecimento: '>{filterCity? filterCity.presence: ''}</Item> 

        </div>
        <ElectionCards allCities={filterCity} cityId={allElection.cityId}>

          {filterCandidatesCity.map(({ id, cityId, candidateId, votes, statusItem, candidateName }) => {
            return (
              <ElectionCard
                key={id}
                id={id}
                cityId={cityId}
                candidateId={candidateId}
                votes={votes}
                name={"name do cara"}
                totalVotes={filterCity.presence}
                statusItem={statusItem}
                candidateName={candidateName}
              />
            );
          })}
        </ElectionCards>
      </>
    );
  }



  return (
    <>
      <Header>react-elections</Header>
      <div className="flex flex-col items-center text-center">
        <p>Escolha o município</p>
        <select
          id={'selectCity'}
          onChange={e => setSelectedCity(e.target.value)}
          className='shadow-lg'
        >
         
          {allCities.map(({ id, name }) => {
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>
      </div>

      <Main>{mainJsx}</Main>
    </>
  );
}
