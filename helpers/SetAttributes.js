export const setAttributes = (attrs, parent) => {
  if (attrs) {
    Object.keys(attrs).forEach(key => {
      if (key in parent && !(attrs[key] instanceof Object)) {
        // Warn if types does not match
        if (attrs[key] !== null && typeof parent[key] !== typeof attrs[key]) {
          console.warn(
            `${parent.constructor.name.toUpperCase()}: Expected "${key}" to be of type "${typeof parent[
              key
            ]} | null". Instead got ${typeof attrs[key]}`
          );
        }

        // Set attribute
        parent[key] = attrs[key];
      }
    });
  }
};
