import ApiRoutes from "@/helpers/ApiRoutes";
import StoreError from "@/models/helpers/StoreError";
import { AstronautsParams } from "@/helpers/ApiParams";

export const actions = {
  handler: () => {},

  async fetchAstronauts({ commit }, paramsClass) {
    commit("SET_LOADING", true);

    if (!(paramsClass instanceof AstronautsParams)) {
      const error = new StoreError({
        path: "astronauts/actions/fetchAstronauts",
        message: `Use "AstronautsParams" class as a params object`
      });

      console.error(error);

      commit("SET_LOADING", false);
      return;
    }

    const params = paramsClass.getParams();

    try {
      const { data } = await this.$axios(ApiRoutes.Astronauts.GetAll, {
        params
      });

      const { count, next, previous, results } = data;

      commit("SET_META", {
        count,
        next,
        previous
      });

      commit("CLEAR_ASTRONAUTS");
      commit("SET_ASTRONAUTS", results);
    } catch (e) {
      const error = new StoreError({
        path: "astronauts/actions/fetchAstronauts",
        message: e.message
      });

      console.error(error);
    }

    commit("SET_LOADING", false);
  }
};
