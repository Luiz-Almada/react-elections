//import { getNewId } from '../services/idService';
import { useEffect, useState } from 'react';

import Error from '../components/Error';
import ElectionCard from '../components/ElectionCard';
import ElectionCards from '../components/ElectionCards';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Main from '../components/Main';
import Item from '../components/Item';

import {
//  apiGetElectionsByCityId,
  apiGetAllCities,
  apiGetAllElection,
} from '../services/apiService';

export default function FlashCardsPage() {
  // Back End
  const [allCities, setAllCities] = useState([]);
  const [allElection, setAllElection] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Front End
  const [filterCity, setFilterCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [filterCandidatesCity, setFilterCandidatesCity] = useState([]);

  useEffect(() => {
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

    getAllCities();
    getAllElection();
  }, []);

  useEffect(() => {
    function handleFilterCity(){
       const result = allCities.filter(item => item.id === selectedCity);
       setFilterCity(result[0]);
       console.log(result[0]);
      }
      handleFilterCity();
  }, [allCities, selectedCity]);

  useEffect(() => {
    function handleFilterCity(){
       const result = allCities.filter(item => item.id === selectedCity);
       setFilterCity(result[0]);
       console.log(result[0]);
      }
      handleFilterCity();
  }, [allCities, selectedCity]);




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
          <Item label='Total de eleitores: '>{filterCity.value}</Item> 
          <Item label='Abstenção: '>{filterCity.presence}</Item> 
          <Item label='Comparecimento: '>{filterCity.votingPopulation}</Item> 
        </div>
        <ElectionCards allCities={allCities} cityId={allElection.cityId}>

          {allElection.map(({ id, cityId, candidateId, votes }) => {
            return (
              <ElectionCard
                key={id}
                id={id}
                title={candidateId}
                description={votes}
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
          // onChange={e => setSelectedCity(e.target.options[e.target.selectedIndex].textContent)} 
          onChange={e => setSelectedCity(e.target.value)} 
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
