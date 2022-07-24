import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { viewTeamDetails } from '../../api/mergedData';
import TeamCard from '../../components/TeamCard';
import PlayerCard from '../../components/PlayerCard';

export default function ViewTeam() {
  const [teamDetails, setteamDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTeamDetails(firebaseKey)
      .then(setteamDetails);
  }, [firebaseKey]);

  console.warn(teamDetails);

  return (
    <>
      <TeamCard key={firebaseKey} teamObj={teamDetails} src={teamDetails.image} onUpdate={() => null} />
      <div className="d-flex flex-wrap">
        {teamDetails.players?.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} src={player.image} onUpdate={() => null} />
        ))}
      </div>

    </>
  );
}
