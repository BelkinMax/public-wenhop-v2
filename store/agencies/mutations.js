import StoreError from "@/models/helpers/StoreError";
import Agency from "@/models/Agency";

const SET_AGENCIES = (state, data) => {
  if (Array.isArray(data)) {
    data.forEach(agency => {
      state.agencies.push(new Agency(agency));
    });
  }
};

const SET_AGENCY = (state, data) => {
  if (data instanceof Object) {
    state.agency = new Agency(data);
  } else {
    const error = new StoreError({
      path: "agencies/mutations/SET_AGENCY",
      message: `${data} is not an instance of Object type. Recieved ${typeof data}`
    });
    console.error(error);
  }
};

const SET_META = (state, data) => {
  if (data instanceof Object) {
    const { count, next, previous } = data;

    state.meta.count = count;
    state.meta.next = next;
    state.meta.previous = previous;
  } else {
    const error = new StoreError({
      path: "agencies/mutations/SET_META",
      message: `${data} is not an instance of Object type. Recieved ${typeof data}`
    });
    console.error(error);
  }
};

const CLEAR_AGENCIES = state => {
  state.agencies = [];
};

const CLEAR_AGENCY = state => {
  state.agency = new Agency();
};

const SET_AGENCIES_FILTERS = (state, data) => {
  if (data) {
    Object.keys(data).forEach(key => {
      if (key in state.filters) state.filters[key] = data[key];
    });
  }
};

const SET_LOADING = (state, data) => {
  if (typeof data === "boolean") {
    state.isLoading = data;
  } else {
    const error = new StoreError({
      path: "agencies/mutations/SET_LOADING",
      message: `Expected ${data} to be of type "boolean". Recieved "${typeof data}"`
    });
    console.error(error);
  }
};

export default {
  SET_AGENCIES,
  SET_AGENCY,
  SET_META,
  CLEAR_AGENCIES,
  CLEAR_AGENCY,
  SET_AGENCIES_FILTERS,
  SET_LOADING
};
