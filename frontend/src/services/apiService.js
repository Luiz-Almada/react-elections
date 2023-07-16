import { read } from './httpService';
//apiGetElectionsByCityId
export async function apiGetAllCandidates() {
  const allFlashCards = await read('/candidates');
  return allFlashCards;
}

export async function apiGetAllCities() {
  const allCities = await read('/cities');
  return allCities;
}

export async function apiGetAllElection() {
  const allElection = await read('/election');
  return allElection;
}
