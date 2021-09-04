export class AgenciesParams {
  featured = false;
  agency_type = 0;
  country_code = "";
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
