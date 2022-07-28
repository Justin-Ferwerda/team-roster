import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { deleteSingleTrade } from '../api/tradeData';

export default function TradeRequestCard({
  tradeObj, username, teamToTrade, teamToReceive, onUpdate,
}) {
  const deleteThisTrade = () => {
    if (window.confirm('Reject This Trade?')) {
      deleteSingleTrade(tradeObj.firebaseKey).then(() => onUpdate());
    }
  };
  return (
    <Card>
      <Card.Header as="h5">Trade Request</Card.Header>
      <Card.Body>
        <Card.Text>
          {username} would like to offer you the <strong>{teamToTrade}</strong> for the <strong>{teamToReceive}</strong>. Do you accept?
        </Card.Text>
        <Button variant="outline-dark">Accept Trade</Button>
        <Button variant="outline-danger" onclick={deleteThisTrade}>reject Trade</Button>
      </Card.Body>
    </Card>
  );
}

TradeRequestCard.propTypes = {
  tradeObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  teamToTrade: PropTypes.string.isRequired,
  teamToReceive: PropTypes.string.isRequired,
};
