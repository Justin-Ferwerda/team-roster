import { useRef } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { deleteSinglePlayer } from '../api/playerData';

function PlayerCard({ playerObj, onUpdate }) {
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.name}?`)) {
      deleteSinglePlayer(playerObj.firebaseKey).then(() => onUpdate());
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
        <Image src={playerObj.image} layout="fill" />
      </FrontSide>
      <BackSide style={{ backgroundColor: '#FFC72C' }}>
        <h1>{playerObj.name}</h1>
        <h3>{playerObj.position}</h3>
        <h3>{playerObj.team}</h3>
        <Link href={`/player/edit/${playerObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPlayer} className="m-2">
          DELETE
        </Button>
      </BackSide>
    </Flippy>
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
};

export default PlayerCard;
