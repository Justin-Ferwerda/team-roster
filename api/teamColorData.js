import axios from 'axios';
import { clientCredentials } from '../utils/client';
import { getSinglePlayer } from './playerData';
import { getSingleTeam } from './teamData';

const dbUrl = clientCredentials.databaseURL;

const getTeamColors = (teamName) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/teamColors.json?orderBy="teamName"&equalTo="${teamName}"`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

const assignTeamColors = (playerfirebaseKey) => new Promise((resolve, reject) => {
  getSinglePlayer(playerfirebaseKey).then((playerObj) => getSingleTeam(playerObj.teamId).then((teamObject) => {
    const name = teamObject.teamName;
    getTeamColors(name).then((color) => {
      const payload = { backSideColor: color.backSideColor, frontsideColor: color.frontsideColor };

      axios.patch(`${dbUrl}/players/${playerfirebaseKey}.json`, payload).then(resolve);
    });
  }).catch(reject));
});

export default assignTeamColors;
