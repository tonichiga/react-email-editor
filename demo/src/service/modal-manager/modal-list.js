import modalAction from './modal-actions';
import LoadSample from '../../components/modals/load-sample';
import SaveSample from '../../components/modals/save-sample';

const modals = {
  [modalAction.LOAD]: LoadSample,
  [modalAction.SAVE]: SaveSample,
};

export default modals;
