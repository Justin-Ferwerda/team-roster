import { useRef } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { deleteTeamPlayers } from '../api/mergedData';

function TeamCard({ teamObj, src, onUpdate }) {
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.name}?`)) {
      deleteTeamPlayers(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  const ref = useRef();
  return (
    <Flippy
      flipOnHover={false} // default false
      flipOnClick // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
      style={{ width: '250px', height: '300px', margin: '10px' }}
    >
      <FrontSide style={{ backgroundColor: '#26282A' }}>
        <Image src={src} layout="fill" />
      </FrontSide>
      <BackSide style={{ backgroundColor: '#FFC72C' }}>
        <div className="team-details">
          <h1>{teamObj.city}</h1>
          <h1>{teamObj.name}</h1>
        </div>
        <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisTeam} className="m-2">
          DELETE
        </Button>
        <h5 style={{ textAlign: 'center' }}>{teamObj.public ? 'Public' : ''}</h5>
        <Link href={`/team/${teamObj.firebaseKey}`} passHref>
          <Button variant="info">VIEW DETAILS</Button>
        </Link>
      </BackSide>
    </Flippy>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    city: PropTypes.string,
    public: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  src: PropTypes.string,
};

TeamCard.defaultProps = {
  src: '/images/klaythompson.png',
};

export default TeamCard;
