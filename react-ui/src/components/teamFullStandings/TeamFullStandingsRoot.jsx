import React from 'react';

import TeamFullStandingsContent from './TeamFullStandingsContent';

export default class TeamFullStandingsRoot extends React.Component {
  
  componentDidMount() {
    const tournamentId = this.props.match.params.tournamentId;
    if (typeof this.props.selectedPhaseId !== 'undefined') {
      this.props.requestFullTeamStandings(tournamentId, this.props.selectedPhaseId);
      this.props.getIndividualStandings(tournamentId, this.props.selectedPhaseId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const oldPhaseId = prevProps.selectedPhaseId;
    const currentPhaseId = this.props.selectedPhaseId;
    if (oldPhaseId !== currentPhaseId) {
      const tournamentId = this.props.match.params.tournamentId;
      this.props.requestFullTeamStandings(tournamentId, currentPhaseId);
      this.props.getIndividualStandings(tournamentId, this.props.selectedPhaseId);
    }
  }

  render() {
    const { fullTeamStats, tossupValues, individualStatsByTeam, match, selectedPhaseId } = this.props;
    const tournamentId = match.params.tournamentId;
    return (
      <div>
        <h3> Full Team Standings </h3>
        <TeamFullStandingsContent fullTeamStats={fullTeamStats} tossupValues={tossupValues} individualStatsByTeam={individualStatsByTeam}
          tournamentId={tournamentId} phaseId={selectedPhaseId}/>
      </div>
    )
  }
};