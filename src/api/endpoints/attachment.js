import base from './urlBase';

export default {
  getAll: `${base.API}/attachments?mode=list`,
  find: (id) => `${base.API}/attachments/${id}`,
  upload: `${base.API}/attachments`,
  destroy: `${base.API}/attachments/destroy`,
  download: '/attachments',
  requirements: `${base.API}/attachments/requirements`,
};