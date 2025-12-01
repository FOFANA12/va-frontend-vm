import base from './urlBase';

export default {
  getAll: `${base.API}/action-alignments?mode=list`,
  requirements: (actionId) => `${base.API}/action-alignments/requirements/${actionId}`,
  align: (actionId) => `${base.API}/action-alignments/align/${actionId}`,
  unalign: `${base.API}/action-alignments/unalign`,
};
