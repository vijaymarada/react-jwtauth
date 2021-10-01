import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Cookies from 'js-cookie';
const apiUrl = '';
/*axios.interceptors.request.use(
  config => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const token = Cookies.get("token")
    console.log('token',token)
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);*/
function App() {
  const [jwt, setJwt] = useState(null);
  const [foods, setFoods] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const getJwt = async () => {
    const { data } = await axios.get(`/jwt`);
    setJwt(data.token);
  }
  const getFoods = async () => {
    try {
      console.log(Cookies.get('token'))
      const { data } = await axios.get(`/foods`, {
        headers: {
          Authorization: 'Bearer ' + Cookies.get('token') //the token is a variable which holds the token
        }
      });
      setFoods(data);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
    }
  };
  return (
    <>
      <section style={{ marginBottom: '10px' }}>
        <button onClick={() => getJwt()}>Get JWT</button>
        {jwt && (
          <pre>
            <code>{jwt}</code>
          </pre>
        )}
      </section>
      <section>
        <button onClick={() => getFoods()}>
          Get Foods
        </button>
        <ul>
          {foods.map((food, i) => (
            <li>{food.description}</li>
          ))}
        </ul>
        {fetchError && (
          <p style={{ color: 'red' }}>{fetchError}</p>
        )}
      </section>
    </>
  );
}
export default App;