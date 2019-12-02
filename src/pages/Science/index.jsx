import React, { useEffect, useState } from 'react';

import ForumLayout from '../../components/ForumLayout';
import { getTopics } from '../../api';

function Forums() {
  const [topics, setTopics] = useState('');
  useEffect(() => {
    async function fetchTopics() {
      const resp = await getTopics('Science');
      if (resp) {
        setTopics(resp);
      }
    }
    fetchTopics();
  }, []);

  return (
    <>
      { topics && <ForumLayout topics={topics} subject="Science" /> }
    </>
  );
}

export default Forums;
