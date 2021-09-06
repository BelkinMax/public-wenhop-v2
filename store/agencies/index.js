//!! WARN  Cannot stringify arbitrary non-POJOs Agency
//TODO Better not store class instance directly to the store to get rid of this warning

import getters from "./getters";
import mutations from "./mutations";
import { actions } from "./actions";

import Agency from "@/models/Agency";

const state = () => {
  return {
    agencies: [],
    agency: new Agency(),

    meta: {
      count: 0,
      next: null,
      previous: null
    },

    filters: {
      search: "",
      featured: false,
      agencyType: "",
      country: "",
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
