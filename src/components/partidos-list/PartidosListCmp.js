import React from 'react';
import List, { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

const PartidosList = props => {
  const { partidos } = props;
  const dateOptions = {
    month: 'short',
    weekday: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'America/Guatemala'
  };
  const itemsArr = partidos.map(partido => {
    return (
      <ListItem
        key={`${partido.awayTeamName}-vs-${partido.homeTeamName}`}
        leftAvatar={<Avatar src={partido.awayTeamFlagImg} />}
        primaryText={`${partido.awayTeamName} Vs ${partido.homeTeamName}`}
        secondaryText={new Intl.DateTimeFormat('es-Gt', dateOptions)
          .format(new Date(partido.date))
          .toString()}
        rightAvatar={<Avatar src={partido.homeTeamFlagImg} />}
      />
    );
  });
  return (
    <List
      style={{
        width: '100%',
        maxWidth: 330,
        backgroundColor: '#F0ECE4',
        position: 'relative',
        overflow: 'auto',
        marginTop: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 20
      }}
    >
      <Subheader style={{ textAlign: 'center' }}>
        Los Partidos del Mundial Rusia 2018; Horarios de Guatemala: UTC-6
      </Subheader>
      {itemsArr}
    </List>
  );
};
export default PartidosList;
