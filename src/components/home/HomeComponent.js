import React from 'react';
import TopBar from '../app-bar/AppBar';
import PartidosList from '../partidos-list/PartidosListCmp';

const HomeComponent = ({ partidos, isLoaded }) => {
  if (isLoaded) {
    return (
      <div id="main-content">
        <TopBar />
        <PartidosList partidos={partidos} />
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default HomeComponent;
