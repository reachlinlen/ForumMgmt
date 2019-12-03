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

export const storeNewComment = async (topicId, subject, comments) => {
  const resp = await axios.put(`${URL}/addcomment?topicId=${topicId}&&subject=${subject}`, { body: comments });
  return resp;
};

export const authenticate = async (id, password) => {
  const login = { id: id, password: password };
  const resp = await axios.post(`${URL}/authenticate`, { body: login });
  return resp.data;
};

export const addNewUser = async (id, password) => {
  const login = { id: id, password: password };
  const resp = await axios.post(`${URL}/register`, { body: login });
  return resp;
};
