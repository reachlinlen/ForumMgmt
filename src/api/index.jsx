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
  if (Array.isArray(resp.data)) {
    return resp.data;
  }
  throw resp;
};

export const addTopics = (subject) => {
  console.log(subject);
};
