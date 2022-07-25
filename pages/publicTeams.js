/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Form } from 'react-bootstrap';
import { getPublicTeams } from '../api/teamData';
import TeamCard from '../components/TeamCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [teams, setTeams] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const { user } = useAuth();

  const getAllThePublicTeams = () => {
    getPublicTeams().then(setTeams);
  };

  useEffect(() => {
    getAllThePublicTeams();
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = teams.filter((team) => Object.values(team).join('').toLowerCase().includes(searchInput.toLowerCase()));
      setFilteredResults(filteredData);
    } else { setFilteredResults(teams); }
  };

  return (
    <div className="text-center my-4">
      <Link href="/team/new" passHref>
        <Button>Add A Team</Button>
      </Link>
      <Form.Control icon="search" placeholder="Search Public Teams" onChange={(e) => searchItems(e.target.value)} />
      {searchInput.length > 1 ? (
        <div className="d-flex flex-wrap">
          {filteredResults.map((team) => (
            <TeamCard key={team.firebaseKey} teamObj={team} src={team.image} user={user} onUpdate={getAllThePublicTeams} />
          ))}
        </div>
      ) : (
        <div className="d-flex flex-wrap">
          {teams.map((team) => (
            <TeamCard key={team.firebaseKey} teamObj={team} src={team.image} user={user} onUpdate={getAllThePublicTeams} />
          ))}
        </div>
      )}

    </div>
  );
}

export default Home;
