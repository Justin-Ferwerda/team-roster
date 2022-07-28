/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getMyTradeRequests, getTeamToReceive } from '../api/tradeData';
import TradeRequestCard from '../components/TradeRequestCard';

function Home() {
  const [trades, setTrades] = useState([]);
  const { user } = useAuth();
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const getAllTheTrades = () => {
    getMyTradeRequests(user.uid).then(setTrades);
  };

  useEffect(() => {
    getAllTheTrades();
  }, [user]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = trades.filter((trade) => Object.values(trade).join('').toLowerCase().includes(searchInput.toLowerCase()));
      setFilteredResults(filteredData);
    } else { setFilteredResults(trades); }
  };

  return (
    <div className="text-center my-4">
      <Form.Control icon="search" placeholder="Search Trade requests" onChange={(e) => searchItems(e.target.value)} />
      {searchInput.length > 1 ? (
        <div className="d-flex flex-wrap">
          {filteredResults.map((trade) => (
            <TradeRequestCard key={trade.firebaseKey} tradeObj={trade} username={trade.displayName} teamToTrade={trade.teamName} teamToReceive={getTeamToReceive} onUpdate={getAllTheTrades} />
          ))}
        </div>
      ) : (
        <div className="d-flex flex-wrap">
          {trades.map((trade) => (
            <TradeRequestCard key={trade.firebaseKey} tradeObj={trade} username={trade.displayName} teamToTrade={trade.teamName} teamToReceive={getTeamToReceive} onUpdate={getAllTheTrades} />
          ))}
        </div>
      )}

    </div>
  );
}

export default Home;
