import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout/Layout';
import Providers from './Providers/Providers';
import NotificationsManager from './components/NotificationsManager/NotificationsManager';

const App = () => {
  return (
    <Providers>
      <>
        <NotificationsManager />
        <Layout />
        <Outlet />
      </>
    </Providers>
  );
};

export default App;
