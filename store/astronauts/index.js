import getters from "./getters";
import mutations from "./mutations";
import { actions } from "./actions";

import Astronaut from "@/models/Astronaut";

const state = () => {
  return {
    astronauts: [],
    astronaut: new Astronaut(),

    meta: {
      count: 0,
      next: null,
      previous: null
    },

    filters: {
      search: "",
      agency__name: "",
      status: "",
      nationality: "",
      date_of_birth: "",
      date_of_death: "",
      limit: 9
    },

    isLoading: false
  };
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
