const agencies = state => {
  return state.agencies;
};

const agency = state => {
  return state.agency;
};

const agencyMeta = state => {
  return state.meta;
};

const agencyIsLoading = state => {
  return state.isLoading;
};

export default {
  agencies,
  agency,
  agencyMeta,
  agencyIsLoading
};
