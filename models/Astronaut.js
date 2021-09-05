import { setAttributes } from "@/helpers/SetAttributes";

import Agency from "@/models/Agency";

class Astronaut {
  id = 0;
  url = "";
  name = "";
  date_of_birth = "";
  date_of_death = "";
  nationality = "";
  bio = "";
  twitter = "";
  instagram = "";
  wiki = "";
  profile_image = "";
  profile_image_thumbnail = "";
  last_flight = "";
  first_flight = "";

  // Objects
  status = {
    id: 0,
    name: ""
  };
  type = {
    id: 0,
    name: ""
  };
  agency = null;

  // TODO: Create a constructor that can set values deep

  constructor(attributes) {
    setAttributes(attributes, this);

    this.agency = new Agency(attributes.agency);
    this.status = attributes.status; // TODO: Create class for status
    this.type = attributes.type; // TODO: Create class for type
  }
}

export default Astronaut;
