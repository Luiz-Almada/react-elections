import { getNewId } from '../services/idService';
import { useEffect, useState } from 'react';

import Error from '../components/Error';
import ElectionCard from '../components/ElectionCard';
import ElectionCards from '../components/ElectionCards';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Main from '../components/Main';

// import FlashCardItem from '../components/FlashCardItem';
// import { helperShuffleArray } from '../helpers/arrayHelpers';

import {
  apiGetElectionsByCityId,
  apiGetAllCities,
  apiGetAllElection,
} from '../services/apiService';

export default function FlashCardsPage() {
  // Back End
  const [allCities, setAllCities] = useState([]);
  const [allElection, setAllElection] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        <ElectionCards allCities={allCities}>
          {allElection.map(({ id, cityId, candidateId, votes }) => {
            return (
              <ElectionCard
                key={id}
                id={id}
                title={name}
                description={username}
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
          id={getNewId()}
          //onChange={handleFilterEle}
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
