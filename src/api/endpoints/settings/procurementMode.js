import base from '../urlBase';

export default {
  getAll: `${base.API_SETTING}/procurement-modes?mode=list`,
  requirements: `${base.API_SETTING}/procurement-modes/requirements`,
  find: (id, mode = 'edit') => `${base.API_SETTING}/procurement-modes/${id}?mode=${mode}`,
  create: `${base.API_SETTING}/procurement-modes`,
  update: (id) => `${base.API_SETTING}/procurement-modes/${id}`,
  destroy: `${base.API_SETTING}/procurement-modes/destroy`,
};
