import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePlayer } from '../../../api/playerData';
import PlayerForm from '../../../components/forms/PlayerForm';

export default function EditPlayer() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSinglePlayer(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<PlayerForm obj={editItem} />);
}
