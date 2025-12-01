import base from './urlBase';

export default {
  getAll: `${base.API}/supplier-evaluations?mode=list`,
  find: (id, mode = 'edit') => `${base.API}/supplier-evaluations/${id}?mode=${mode}`,
  create: (supplierId) => `${base.API}/supplier-evaluations/${supplierId}`,
  update: (id) => `${base.API}/supplier-evaluations/${id}`,
  destroy: (supplierId) => `${base.API}/supplier-evaluations/${supplierId}/destroy`,
};
