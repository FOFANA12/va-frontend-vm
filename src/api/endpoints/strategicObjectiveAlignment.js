import base from './urlBase';

export default {
  getAll: `${base.API}/objective-alignments?mode=list`,
  getStructures: `${base.API}/objective-alignments/structures`,
  getActions: (structureId, objectiveId) =>
    `${base.API}/objective-alignments/actions/${structureId}/${objectiveId}`,
  align: (objectiveId) => `${base.API}/objective-alignments/align/${objectiveId}`,
  unalign: `${base.API}/objective-alignments/unalign`,
};
