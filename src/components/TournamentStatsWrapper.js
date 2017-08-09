import React from 'react';
import { Route, Switch } from 'react-router-dom';

import TeamStandingsRoot from './../containers/home/TeamStandings';

export default class TournamentStatsWrapper extends React.Component {

  componentDidMount() {
    const { getTournamentPhases, match } = this.props;
    const tournamentId = match.params.tournamentId;
    getTournamentPhases(tournamentId);
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/t/:tournamentId/' component={ TeamStandingsRoot }/>
          <Route exact path='/t/:tournamentId/team-standings' component={ TeamStandingsRoot }/>
        </Switch>
      </main>
    );
  }
};
