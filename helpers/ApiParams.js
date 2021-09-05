class BaseParams {
  search = "";
  ordering = "";
  limit = 10;
  offset = 0;

  constructor() {}

  getParams() {
    const params = {};

    Object.keys(this).forEach(key => {
      if (this[key]) params[key] = this[key];
    });

    return params;
  }

  addParams(attributes) {
    if (attributes) {
      Object.keys(attributes).forEach(key => {
        if (key in this) this[key] = attributes[key];
      });
    }
  }
}

export class AgenciesParams extends BaseParams {
  featured = false;
  agency_type = 0;
  country_code = "";

  constructor() {
    super();
  }
}
export class AstronautsParams extends BaseParams {
  status = "";
  agency__abbrev = "";
  date_of_death = "";
  name = "";
  nationality = "";
  date_of_birth = "";
  agency__name = "";

  constructor() {
    super();
  }
}
