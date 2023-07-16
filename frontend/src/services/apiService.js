import { read } from './httpService';

export async function apiGetElectionsByCityId() {
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
