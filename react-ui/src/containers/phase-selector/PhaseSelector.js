import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PhaseSelector from '../../components/PhaseSelector';
import { updateUrlWithPhase } from '../../modules/tournamentStatsWrapper/actions';

const mapStateToProps = state => ({
  phases: state.globalState.phases,
  selectedPhaseId: state.globalState.selectedPhaseId,
  loadingStatuses: [
    state.teamStandings.requestingTeamStandings,
    state.individualStandings.requestingIndividualStandings,
    state.teamFullStandings.requestingFullTeamStandings,
    state.individualFullStandings.requestingFullIndividualStandings,
    state.roundReport.requestingRoundReport,
  ],
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateUrlWithPhase,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhaseSelector);