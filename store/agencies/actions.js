import ApiRoutes from "@/helpers/ApiRoutes";
import StoreError from "@/models/helpers/StoreError";
import { AgenciesParams } from "@/helpers/ApiParams";

export const actions = {
  handler: () => {},

  async fetchAgencies({ commit }, paramsClass) {
    commit("SET_LOADING", true);

    if (!(paramsClass instanceof AgenciesParams)) {
      const error = new StoreError({
        path: "agencies/actions/fetchAgencies",
        message: `Use "AgenciesParams" class as a params object`
      });

      console.error(error);

      commit("SET_LOADING", false);
      return;
    }

    const params = paramsClass.getParams();

    try {
      const { data } = await this.$axios(ApiRoutes.Agencies.GetAll, {
        params
      });

      const { count, next, previous, results } = data;

      commit("SET_META", {
        count,
        next,
        previous
      });

      commit("CLEAR_AGENCIES");
      commit("SET_AGENCIES", results);
    } catch (e) {
      const error = new StoreError({
        path: "agencies/actions/fetchAgencies",
        message: e.message
      });

      console.error(error);
    }

    commit("SET_LOADING", false);
  }
};
