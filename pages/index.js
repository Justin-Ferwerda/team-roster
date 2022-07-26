/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getTeams } from '../api/teamData';
import TeamCard from '../components/TeamCard';

function Home() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const getAllTheTeams = () => {
    getTeams(user.uid).then(setTeams);
  };

  useEffect(() => {
    getAllTheTeams();
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
      <Form.Control icon="search" placeholder="Search Teams" onChange={(e) => searchItems(e.target.value)} />
      {searchInput.length > 1 ? (
        <div className="d-flex flex-wrap">
          {filteredResults.map((team) => (
            <TeamCard key={team.firebaseKey} teamObj={team} src={team.image} user={user} onUpdate={getAllTheTeams} />
          ))}
        </div>
      ) : (
        <div className="d-flex flex-wrap">
          {teams.map((team) => (
            <TeamCard key={team.firebaseKey} teamObj={team} src={team.image} user={user} onUpdate={getAllTheTeams} />
          ))}
        </div>
      )}

    </div>
  );
}

export default Home;
