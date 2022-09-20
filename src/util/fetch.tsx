import axios from 'axios';
const baseURL = 'https://rickandmortyapi.com/api/';

const client = axios.create({baseURL});

export const fetch = ({...options}) => {
  // console.log('options', options);
  const onSuccess = response => response.data;
  const onError = error => error;
  return client(options).then(onSuccess).catch(onError);
};
