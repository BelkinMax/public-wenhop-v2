const BASE = "https://lldev.thespacedevs.com/2.2.0";

const AGENCIES = `${BASE}/agencies/`;
const AGENCY_ID = id => `${BASE}/agencies/${id}/`;
const ASTRONAUTS = BASE + "/astronaut/";
const ASTRONAUT_ID = id => `${BASE}/astronaut/${id}/`;

const ApiRoutes = {
  Agencies: {
    GetAll: AGENCIES,
    GetOne: id => AGENCY_ID(id)
  },
  Astronauts: {
    GetAll: ASTRONAUTS,
    GetOne: id => ASTRONAUT_ID(id)
  }
};

export default ApiRoutes;
