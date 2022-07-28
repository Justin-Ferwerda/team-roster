import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import createTradeRequest from '../../api/tradeData';
import { getTeams } from '../../api/teamData';

const initialState = {
  image: '',
  name: '',
  position: '',
};

function TradeForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  // const router = useRouter();
  const { user } = useAuth();
  console.warn(obj);

  useEffect(() => {
    getTeams(user.uid).then(setTeams);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput, uid: user.uid, originalUid: obj.uid, teamFirebaseKey: obj.firebaseKey,
    };
    createTradeRequest(payload).then(null);
  };

  return (
    <>
      <h1>Make a Trade</h1>
      <Form onSubmit={handleSubmit}>
        <h4 className="text-white mt-5">Team I want</h4>

        <FloatingLabel controlId="floatingInput1" label="Team Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="teamName"
            onChange={handleChange}
            value={obj.teamName}
            required
            disabled
          />
        </FloatingLabel>

        <h4 className="text-white mt-5">Team I Will Trade</h4>
        <FloatingLabel controlId="floatingSelect" label="Team">
          <Form.Select
            aria-label="Team"
            name="teamToTrade"
            onChange={handleChange}
            className="mb-3"
            value={obj.teamId}
            required
          >
            <option value="">Select a Team</option>
            {
            teams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >
                {team.teamName}
              </option>
            ))
          }
          </Form.Select>
        </FloatingLabel>

        <Button type="submit">Make Trade request</Button>
      </Form>
    </>

  );
}

TradeForm.propTypes = {
  obj: PropTypes.shape({
    teamName: PropTypes.string,
    firebaseKey: PropTypes.string,
    teamId: PropTypes.string,
    uid: PropTypes.string,
  }),
};

TradeForm.defaultProps = {
  obj: initialState,
};

export default TradeForm;
