/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
import { getPlayers } from '../api/playerData';
import { useAuth } from '../utils/context/authContext';
import PlayerCard from '../components/PlayerCard';

function Home() {
  const [players, setPlayers] = useState([]);
  const { user } = useAuth();
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const getAllThePlayers = () => {
    getPlayers(user.uid).then(setPlayers);
  };

  useEffect(() => {
    getAllThePlayers();
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = players.filter((player) => Object.values(player).join('').toLowerCase().includes(searchInput.toLowerCase()));
      setFilteredResults(filteredData);
    } else { setFilteredResults(players); }
  };

  return (
    <div className="text-center my-4">
      <Link href="/player/new" passHref>
        <Button>Add A Player</Button>
      </Link>
      <Form.Control icon="search" placeholder="Search Players" onChange={(e) => searchItems(e.target.value)} />
      {searchInput.length > 1 ? (
        <div className="d-flex flex-wrap">
          {filteredResults.map((player) => (
            <PlayerCard key={player.firebaseKey} playerObj={player} src={player.image} onUpdate={getAllThePlayers} />
          ))}
        </div>
      ) : (
        <div className="d-flex flex-wrap">
          {players.map((player) => (
            <PlayerCard key={player.firebaseKey} playerObj={player} src={player.image} onUpdate={getAllThePlayers} />
          ))}
        </div>
      )}

    </div>
  );
}

export default Home;
