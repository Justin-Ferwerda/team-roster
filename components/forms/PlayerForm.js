import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createPlayer, updatePlayer } from '../../api/playerData';
import { getTeams } from '../../api/teamData';

const initialState = {
  image: '',
  name: '',
  position: '',
};

function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

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
    if (obj.firebaseKey) {
      updatePlayer(formInput)
        .then(() => router.push('/players'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(() => {
        router.push('/players');
      });
    }
  };

  return (
    <>
      <h1>Add A Player</h1>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Player</h2>

        <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="Image URL" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Image URL"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label="Position" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Position"
            name="position"
            value={formInput.position}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingSelect" label="Team">
          <Form.Select
            aria-label="Team"
            name="teamId"
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

        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Player</Button>
      </Form>
    </>

  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
    firebaseKey: PropTypes.string,
    teamId: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: initialState,
};

export default PlayerForm;
