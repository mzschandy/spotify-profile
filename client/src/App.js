/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './App.css';
import Layout from './components/layout/Layout.component';
import Login from './components/login/login.component';
import { token } from './routes';

const App = () => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    setAccessToken(token);
  }, [])

  return (
    <>
      {accessToken ? <Layout /> : <Login />}
    </>
  );
}

export default App;
