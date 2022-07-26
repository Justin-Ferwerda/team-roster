import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { viewTeamDetails } from '../../api/mergedData';
import TeamCard from '../../components/TeamCard';
import PlayerCard from '../../components/PlayerCard';
import { useAuth } from '../../utils/context/authContext';

export default function ViewTeam() {
  const [teamDetails, setteamDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTeamDetails(firebaseKey)
      .then(setteamDetails);
  }, [firebaseKey, teamDetails]);

  return (
    <>
      <div className="d-flex flex-wrap">
        <TeamCard key={firebaseKey} teamObj={teamDetails} src={teamDetails.image} user={user} onUpdate={() => null} />
      </div>
      <div className="d-flex flex-wrap">
        {teamDetails.players?.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} src={player.image} city={teamDetails.city} teamName={teamDetails.name} user={user} onUpdate={() => null} />
        ))}
      </div>

    </>
  );
}
