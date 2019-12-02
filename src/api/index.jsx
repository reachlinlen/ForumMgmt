import axios from 'axios';

import { URL } from '../constants';

const HEADERS = {
  'Content-Type': 'application/json',
  'crossDomain': true,
  // 'Authorization': 'JWT',
  'Content-Security-Policy': `default-src 'none'; script-src 'self';
                              connect-src 'self';img-src 'self';style-src 'self';`,
  'X-Content-Type-Options': 'nosniff',
  'Pragma': 'no-cache',
};

export const getTopics = async (subject) => {
  const resp = await axios.get(`${URL}/topics?subject=${subject}`);
  return resp.data;
};

export const getTopicContent = async (subject, topicId) => {
  const resp = await axios.get(`${URL}/topicdata?subject=${subject}&&topicId=${topicId}`);
  return resp.data;
};
