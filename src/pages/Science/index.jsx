import React, { useEffect, useState } from 'react';
import { get } from 'lodash';

import ForumLayout from '../../components/ForumLayout';
import { getTopics } from '../../api';

function Forums() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const resp = await getTopics('Science');
      if (resp) {
        console.log('resp', resp);
        setTopics(resp);
      }
    }
    fetchData();
  }, []);

  return (
    <ForumLayout topics={topics} />
  );
}

export default Forums;
