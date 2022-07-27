import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes, { string } from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, updateTeam } from '../../api/teamData';

const initialState = {
  image: '',
  name: '',
  city: '',
};

function TeamForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
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
      updateTeam(formInput)
        .then(() => router.push('/teams'));
    } else {
      const payload = {
        ...formInput, uid: user.uid, displayName: user.displayName, photoURL: user.photoURL,
      };
      createTeam(payload).then(() => {
        router.push('/teams');
      });
    }
  };

  return (
    <>
      <h1>Add A Team</h1>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Team</h2>

        <FloatingLabel controlId="floatingInput1" label="Team Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Name"
            name="teamName"
            value={formInput.teamName}
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

        <Form.Check
          className="text-white mb-3"
          type="switch"
          id="public"
          name="public"
          label="Public?"
          checked={formInput.public}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              public: e.target.checked,
            }));
          }}
        />

        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Team</Button>
      </Form>
    </>

  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    public: PropTypes.bool,
    firebaseKey: string,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};

export default TeamForm;
