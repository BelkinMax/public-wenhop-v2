const astronauts = state => {
  return state.astronauts;
};

const astronaut = state => {
  return state.astronaut;
};

const astronautsFiltes = state => {
  return state.filters;
};

const astronautsMeta = state => {
  return state.meta;
};

const astronautsIsLoading = state => {
  return state.isLoading;
};

export default {
  astronauts,
  astronaut,
  astronautsFiltes,
  astronautsMeta,
  astronautsIsLoading
};
