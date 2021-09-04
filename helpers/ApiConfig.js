import StoreError from "@/models/StoreError";

export const AGENCY_TYPES = idOrName => {
  const types = [
    {
      id: 1,
      name: "Government"
    },
    {
      id: 2,
      name: "Multinational"
    },
    {
      id: 3,
      name: "Commercial"
    },
    {
      id: 4,
      name: "Educational"
    },
    {
      id: 5,
      name: "Private"
    },
    {
      id: 6,
      name: "Unknown"
    }
  ];

  if (typeof idOrName === "number") {
    let result = types.find(el => el.id === idOrName);
    return result.name;
  }

  if (typeof idOrName === "string") {
    let result = types.find(el => el.name === idOrName);
    return result.id;
  }

  const error = new StoreError({
    path: "AGENCY_TYPES",
    message: `Expected ${idOrName} to be of type "string | number". Recieved "${typeof idOrName}"`
  });
  console.error(error);

  return;
};
