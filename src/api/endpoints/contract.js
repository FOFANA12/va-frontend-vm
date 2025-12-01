import base from './urlBase';

export default {
  getAll: `${base.API}/supplier-contracts?mode=list`,
  find: (id, mode = 'edit') => `${base.API}/supplier-contracts/${id}?mode=${mode}`,
  create: (supplierId) => `${base.API}/supplier-contracts/${supplierId}`,
  update: (id) => `${base.API}/supplier-contracts/${id}`,
  destroy: `${base.API}/supplier-contracts/destroy`,
};
