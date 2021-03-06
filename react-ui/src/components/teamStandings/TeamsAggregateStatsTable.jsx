import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { HashLink as Link } from 'react-router-hash-link';

import { getNumberOfTossupsByValue } from './../../util/stats-util';
import { removeHeadersRelatedToNegs } from './../../util/headers-util';
import ObjectTableRow from '../util/ObjectTableRow';

const TEAM_URL = '/t/{tournamentId}/{slug}/team-full?phase={phaseId}#team_{teamId}';

const HEADERS = [
  { displayName: 'Rank', field: 'rank' },
  { displayName: 'Team', field: (team, tournamentId, slug, phaseId) => {
    let url = TEAM_URL.replace('{tournamentId}', tournamentId)
      .replace('{teamId}', team.teamId)
      .replace('{slug}', slug)
    if (phaseId) {
      url = url.replace('{phaseId}', phaseId);
    } else {
      url = url.replace('?phase={phaseId}', '');
    }
    return <Link to={url}> {team.teamName} </Link>;
  }},
  { displayName: 'W', field: 'wins' },
  { displayName: 'L', field: 'losses' },
  { displayName: 'T', field: 'ties' },
  { displayName: 'Win %', field: 'winPercentage' },
  { displayName: 'PPG', field: 'ppg' },
  { displayName: 'PAPG', field: 'papg' },
  { displayName: 'Margin', field: 'margin' },
  { displayName: 'TUH', field: 'totalTUH' },
  { displayName: 'PPTH', field: 'pointsPerTossupHeard' },
  { displayName: 'P / N', field: 'powersToNegRatio', measuresNeg: true },
  { displayName: 'G / N', field: 'getsToNegRatio', measuresNeg: true },
  { displayName: 'PPB', field: 'ppb' },
];

const INDEX_TO_INSERT_POINT_SCHEME = 8;

export default class TeamsAggregateStatsTable extends React.Component {

  static propTypes = {
    allTeamStats: PropTypes.arrayOf(PropTypes.object).isRequired,
    tossupValues: PropTypes.arrayOf(PropTypes.object).isRequired,
    bracket: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    phaseId: PropTypes.string,
    tournamentId: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  };

  getTableHeaders() {
    let copy = Object.assign([], HEADERS);
    const values = this.props.tossupValues.map(tv => ({
      displayName: tv.value,
      field: team => getNumberOfTossupsByValue(tv.value, team),
    }));
    copy.splice(INDEX_TO_INSERT_POINT_SCHEME, 0, ...values);
    copy.find(h => h.displayName === 'Team').args = [this.props.tournamentId, this.props.slug, this.props.phaseId];
    if (!this.props.usesNegs) {
      copy = removeHeadersRelatedToNegs(copy);
    }
    return copy;
  }

  render() {
    const { allTeamStats, bracket } = this.props;
    const tableHeaders = this.getTableHeaders();
    const bracketHeader = bracket ? <tr><th colSpan={tableHeaders.length}> { bracket.name } </th></tr> : null;
    return (
      <Table responsive condensed hover className='TeamsAggregateStatsTable'>
          <thead>
            { bracketHeader }
            <tr>
              {
                tableHeaders.map(header => <th key={header.displayName}> {header.displayName} </th>)
              }
            </tr>
          </thead>
          <tbody>
            {
              allTeamStats.map(team => <ObjectTableRow key={team.teamId} dataObject={team} headers={tableHeaders}/>)
            }
          </tbody>
      </Table>
    );
  }
};

