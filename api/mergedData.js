import { getSingleTeam, getTeamPlayers, deleteSingleTeam } from './teamData';
import { getSinglePlayer, deleteSinglePlayer } from './playerData';

const viewPlayerDetails = (playerFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePlayer(playerFirebaseKey)
    .then((playerObject) => {
      getSingleTeam(playerObject.teamId)
        .then((teamObject) => {
          resolve({ teamObject, ...playerObject });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamPlayers(teamFirebaseKey)])
    .then(([teamObject, teamPlayersArray]) => {
      resolve({ ...teamObject, players: teamPlayersArray });
    }).catch((error) => reject(error));
});

const deleteTeamPlayers = (teamId) => new Promise((resolve, reject) => {
  getTeamPlayers(teamId).then((playersArray) => {
    const deletePlayerPromises = playersArray.map((player) => deleteSinglePlayer(player.firebaseKey));

    Promise.all(deletePlayerPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

const getTeamsPlayers = (teamFirebaseKey) => new Promise((resolve, reject) => {
  getSingleTeam(teamFirebaseKey)
    .then((teamObject) => {
      getTeamPlayers(teamObject.firebaseKey)
        .then((playerObject) => {
          resolve({ playerObject, ...teamObject });
        });
    }).catch((error) => reject(error));
});

export {
  viewPlayerDetails, viewTeamDetails, deleteTeamPlayers, getTeamsPlayers,
};
