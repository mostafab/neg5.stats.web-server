import { round, keyBy, mapValues, flatMap, orderBy } from 'lodash';

export const getPointsPerTossupHeard = statsObj => round(statsObj.totalPoints / statsObj.totalTUH, 2) || 0;

export const getPowersToNegRatio = statsObj => round(statsObj.totalPowers / statsObj.totalNegs, 2) || 0;

export const getGetsToNegRatio = statsObj => round(statsObj.totalGets / statsObj.totalNegs) || 0;

export const getNumberOfTossupsByValue = (pointValue, statsObj) => {
  const pointValueTotalObject = statsObj.tossupTotals.find(totals => totals.value === pointValue);
  if (pointValueTotalObject) {
    return pointValueTotalObject.total;
  }
  return 0;
}

export const getPlayerPowerToNegRatio = statsObj => {
  const totalPowers = statsObj.tossupTotals
    .filter(tv => tv.answerType === 'Power')
    .reduce((total, currentTV) => total += currentTV.total, 0);
  const totalNegs = statsObj.tossupTotals
    .filter(tv => tv.answerType === 'Neg')
    .reduce((total, currentTV) => total += currentTV.total, 0);

  return round(totalPowers / totalNegs, 2) || 0;
}

export const getPlayerGetsToNegRatio = statsObj => {
  const totalGets = statsObj.tossupTotals
    .filter(tv => tv.answerType !== 'Neg')
    .reduce((total, currentTV) => total += currentTV.total, 0);
  const totalNegs = statsObj.tossupTotals
    .filter(tv => tv.answerType === 'Neg')
    .reduce((total, currentTV) => total += currentTV.total, 0);

  return round(totalGets / totalNegs, 2) || 0;
}

export const getTeamBonusesHeardInMatch = statsObj => {
  return statsObj.totalGets - statsObj.overtimeTossups;
}

export const getTeamBonusPointsInMatch = statsObj => {
  return statsObj.totalPoints - statsObj.tossupPoints - statsObj.bouncebackPoints;
}

export const getTossupPointsPerTossupsHeard = statsObj => {
  return round(statsObj.totalTossupPoints / statsObj.totalTUH, 2) || 0;
}

export const tournamentUsesNegs = tossupValues => tossupValues.some(tv => tv.answerType === 'Neg');

export const groupTeamsAndPlayers = teams => {
  const teamsById = keyBy(teams, 'id');
  const playersById = keyBy(flatMap(teams, team => team.players), 'id');
  return {
    teams: mapValues(teamsById, obj => ({
      ...obj,
      players: keyBy(obj.players, 'id')
    })),
    players: playersById,
  };
}

export const usesNeg = tossupValues => tossupValues.some(tv => tv.answerType === 'Neg')

export const enrichIndividualStats = (stats, teams, players) => {
  const results = stats.map(stat => {
    const player = players[stat.playerId];
    let playerName = null;
    let teamName = null;
    if (player) {
      playerName = player.name;
      teamName = teams[player.teamId] ? teams[player.teamId].name : null;
    }
    return {
      ...stat,
      playerName,
      teamName,
    }
  });
  return orderBy(results, ['ppg'], ['desc']).map((p, i) => ({...p, rank: i + 1}))
}

export default {
  getPointsPerTossupHeard,
  getPowersToNegRatio,
  getGetsToNegRatio,
  getPlayerPowerToNegRatio,
  getPlayerGetsToNegRatio,
  getTeamBonusesHeardInMatch,
  getTeamBonusPointsInMatch,
  getTossupPointsPerTossupsHeard,
  tournamentUsesNegs,
  groupTeamsAndPlayers,
  usesNeg,
  enrichIndividualStats
};
