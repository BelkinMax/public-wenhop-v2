const BASE = "https://lldev.thespacedevs.com/2.2.0";

const AGENCIES = `${BASE}/agencies/`;
const AGENCY_ID = id => `${BASE}/agencies/${id}/`;
// const ASTRONAUT = BASE + "/astronaut/";
// const ASTRONAUT_ID = id => `${BASE}${ASTRONAUT}${id}/`;

const ApiRoutes = {
  Agencies: {
    GetAgencies: AGENCIES,
    GetOneAgency: id => AGENCY_ID(id)
  }
};

export default ApiRoutes;
