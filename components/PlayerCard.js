import { useRef } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { deleteSinglePlayer } from '../api/playerData';

function PlayerCard({
  playerObj, onUpdate, src, city, teamName,
}) {
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.name}?`)) {
      deleteSinglePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };

  const ref = useRef();
  return (
    <div className="playerCard">
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
          <figcaption>
            {playerObj.name}
          </figcaption>
        </FrontSide>
        <BackSide style={{ backgroundColor: '#FFC72C' }}>
          <div className="player-details">
            <h1>{playerObj.name}</h1>
            <h5>{playerObj.position}</h5>
            <h3>{city} {teamName}</h3>
          </div>
          <Link href={`/player/edit/${playerObj.firebaseKey}`} passHref>
            <Button variant="outline-secondary">EDIT</Button>
          </Link>
          <Button variant="outline-danger" onClick={deleteThisPlayer} className="m-2">
            DELETE
          </Button>
        </BackSide>
      </Flippy>
    </div>
  );
}

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    position: PropTypes.string,
    team: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  src: PropTypes.string,
  city: PropTypes.string,
  teamName: PropTypes.string,
};

PlayerCard.defaultProps = {
  src: '',
  city: '',
  teamName: '',
};

export default PlayerCard;
