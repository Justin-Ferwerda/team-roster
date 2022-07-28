import axios from 'axios';
import { clientCredentials } from '../utils/client';
import { getSingleTeam } from './teamData';

const dbUrl = clientCredentials.databaseURL;
const createTradeRequest = (tradeObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/trades.json`, tradeObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/trades/${response.data.name}.json`, payload)
        .then((patchResponse) => resolve(patchResponse.data));
    }).catch(reject);
});

const getAllTrades = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/trades.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getMyTradeOffers = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/trades.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getMyTradeRequests = (originalUid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/trades.json?orderBy="originalUid"&equalTo="${originalUid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deleteSingleTrade = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/trades/${firebaseKey}.json`)
    .then(() => {
      getMyTradeOffers(firebaseKey).then((tradesArray) => resolve(tradesArray));
    })
    .catch((error) => reject(error));
});

const getTeamToReceive = async (tradeFirebaseKey) => {
  const teamObj = getSingleTeam(tradeFirebaseKey);
  return teamObj.teamName;
};

export {
  createTradeRequest, getAllTrades, getMyTradeOffers, getMyTradeRequests, deleteSingleTrade, getTeamToReceive,
};
