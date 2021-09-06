const agencies = state => {
  return state.agencies;
};

const agency = state => {
  return state.agency;
};

const agenciesFiltes = state => {
  return state.filters;
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
  agenciesFiltes,
  agencyMeta,
  agencyIsLoading
};
