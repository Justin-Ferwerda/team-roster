/* eslint-disable @next/next/no-img-element */
import { useRef } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { deleteTeamPlayers } from '../api/mergedData';

function TeamCard({
  teamObj, src, onUpdate, user,
}) {
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.teamName}?`)) {
      deleteTeamPlayers(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  const ref = useRef();
  return (
    <div className="teamCard">
      <Flippy
        flipOnHover={false} // default false
        flipOnClick // default false
        flipDirection="horizontal" // horizontal or vertical
        ref={ref} // to use toggle method like ref.curret.toggle()
      // if you pass isFlipped prop component will be controlled component.
      // and other props, which will go to div
        style={{ width: '250px', height: '350px', margin: '10px' }}
      >
        <FrontSide className="cardFront" style={{ backgroundColor: '#26282A' }}>
          <Image src={src} layout="fill" />
        </FrontSide>
        <BackSide className="cardBack" style={{ backgroundColor: '#FFC72C' }}>
          <div className="team-details">
            <h5>{teamObj.city}</h5>
            <h5>{teamObj.teamName}</h5>
          </div>
          <h6 style={{ textAlign: 'center' }}>{teamObj.public ? 'Public' : ''}</h6>
          {teamObj.uid === user.uid ? (
            <>
              <Link href={`/team/edit/${teamObj.firebaseKey}`} passHref>
                <Button variant="outline-secondary">EDIT</Button>
              </Link>
              <Button variant="outline-danger" onClick={deleteThisTeam} className="m-2">
                DELETE
              </Button>
            </>
          ) : (
            <Link href={`${teamObj.firebaseKey}`} passHref>
              <Button variant="outline-dark">Request Trade</Button>
            </Link>
          )}
          <Link href={`/team/${teamObj.firebaseKey}`} passHref>
            <Button variant="outline-dark">VIEW DETAILS</Button>
          </Link>
          <p>Created by: {teamObj.displayName}</p>
          <img className="user-photo" src={teamObj.photoURL} alt={teamObj.displayName} />
        </BackSide>
      </Flippy>
    </div>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    teamName: PropTypes.string,
    image: PropTypes.string,
    city: PropTypes.string,
    public: PropTypes.bool,
    firebaseKey: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  src: PropTypes.string,
};

TeamCard.defaultProps = {
  src: '/images/error.png',
};

export default TeamCard;
