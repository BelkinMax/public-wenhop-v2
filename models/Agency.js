import { setAttributes } from "@/helpers/SetAttributes";

class Agency {
  id = 0;
  url = "";
  name = "";
  featured = false;
  type = "";
  country_code = "";
  abbrev = "";
  description = "";
  administrator = "";
  founding_year = "";
  launchers = "";
  spacecraft = "";
  parent = "";
  image_url = "";

  constructor(attributes) {
    if (attributes) {
      setAttributes(attributes, this);
    }
  }

  get administratorData() {
    if (!this.administrator) return { role: "", name: "" };
    // EXPECTED FORMAT: administrator = "Role: Full Name"

    const data = this.administrator.split(":");

    if (data.length > 1) {
      // administrator = ["Role", "Full Name"]
      const role = data[0].trim();
      const name = data[1].trim();

      return {
        role,
        name
      };
    }

    return {
      role: "Administrator",
      name: this.administrator
    };
  }
}

export default Agency;
