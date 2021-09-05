class BaseModel {
  id = null;

  constructor(attributes) {
    if (attributes) {
      Object.keys(attributes).forEach(key => {
        if (key in this) this[key] = attributes[key];
      });
    }
  }
}

export default BaseModel;
