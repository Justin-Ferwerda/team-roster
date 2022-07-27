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

const assignTeamColors = async (playerfirebaseKey) => {
  const playerObj = await getSinglePlayer(playerfirebaseKey);
  const teamObj = await getSingleTeam(playerObj.teamId);
  const name = teamObj.teamName;
  const color = await getTeamColors(name).then(Object.values);
  const payload = { backSideColor: color[0].backSideColor, frontSideColor: color[0].frontsideColor };
  return axios.patch(`${dbUrl}/players/${playerfirebaseKey}.json`, payload);
};

export default assignTeamColors;
