import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllPlayers = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getPlayers = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createPlayer = (playerObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/players.json`, playerObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/players/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const getSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteSinglePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/players/${firebaseKey}.json`)
    .then(() => {
      getPlayers(firebaseKey).then((playersArray) => resolve(playersArray));
    })
    .catch((error) => reject(error));
});

const updatePlayer = (playerObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/players/${playerObject.firebaseKey}.json`, playerObject)
    .then(() => {
      getPlayers(playerObject.uid).then(resolve);
    })
    .catch(reject);
});

export {
  getAllPlayers,
  getPlayers,
  createPlayer,
  getSinglePlayer,
  deleteSinglePlayer,
  updatePlayer,
};
