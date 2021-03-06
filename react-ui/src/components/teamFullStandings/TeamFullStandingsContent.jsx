import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import TeamFullStandingsByTeamWrapper from './TeamFullStandingsByTeamWrapper';

export default class TeamFullStandingsContent extends React.Component {
  
  static propTypes = {
    tossupValues: PropTypes.arrayOf(PropTypes.object).isRequired,
    fullTeamStats: PropTypes.arrayOf(PropTypes.object).isRequired,
    individualStatsByTeam: PropTypes.object.isRequired,
    tournamentId: PropTypes.string.isRequired,
    phaseId: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    bouncebacks: PropTypes.bool.isRequired,
    usesNegs: PropTypes.bool,
  }

  render() {
    const { tossupValues, tournamentId, phaseId, fullTeamStats, individualStatsByTeam, slug, bouncebacks, usesNegs } = this.props;
    return (
      <Row className='TeamFullStandingsContent'>
        <Col lg={12} md={12} sm={12}>
          <TeamFullStandingsByTeamWrapper slug={slug} tournamentId={tournamentId} phaseId={phaseId} tossupValues={tossupValues} fullTeamStats={fullTeamStats}
            individualStatsByTeam={individualStatsByTeam} bouncebacks={bouncebacks} usesNegs={usesNegs}/>
        </Col>
      </Row>
    )
  }
}