import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleTeam } from '../api/teamData';
import TradeForm from '../components/forms/TradeForm';

export default function EditTeam() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleTeam(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<TradeForm obj={editItem} />);
}
