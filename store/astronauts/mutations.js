import StoreError from "@/models/helpers/StoreError";
import Astronaut from "@/models/Astronaut";

const SET_ASTRONAUTS = (state, data) => {
  if (Array.isArray(data)) {
    data.forEach(astronaut => {
      state.astronauts.push(new Astronaut(astronaut));
    });
  }
};

const SET_ASTRONAUT = (state, data) => {
  if (data instanceof Object) {
    state.astronaut = new Astronaut(astronaut);
  } else {
    const error = new StoreError({
      path: "astronauts/mutations/SET_ASTRONAUT",
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
      path: "astronauts/mutations/SET_META",
      message: `${data} is not an instance of Object type. Recieved ${typeof data}`
    });
    console.error(error);
  }
};

const CLEAR_ASTRONAUTS = state => {
  state.astronauts = [];
};

const CLEAR_ASTRONAUT = state => {
  state.astronaut = new Astronaut();
};

const SET_ASTRONAUTS_FILTERS = (state, data) => {
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
      path: "astronauts/mutations/SET_LOADING",
      message: `Expected ${data} to be of type "boolean". Recieved "${typeof data}"`
    });
    console.error(error);
  }
};

export default {
  SET_ASTRONAUTS,
  SET_ASTRONAUT,
  SET_META,
  CLEAR_ASTRONAUTS,
  CLEAR_ASTRONAUT,
  SET_ASTRONAUTS_FILTERS,
  SET_LOADING
};
