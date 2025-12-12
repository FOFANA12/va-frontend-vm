import base from "./urlBase"
export default {
  getAll: `${base.API}/suppliers?mode=list`,
  find: (id, mode = 'edit') => `${base.API}/suppliers/${id}?mode=${mode}`,
  create: `${base.API}/suppliers`,
  update: (id) => `${base.API}/suppliers/${id}`,
  destroy: `${base.API}/suppliers/destroy`,
};
