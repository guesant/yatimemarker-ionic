export const searchFieldsToFields = (objFields: any) =>
  Object.entries(objFields || {})
    .filter(([_, isEnabled]) => isEnabled)
    .map(([field]) => field)
    .filter((field) => ["title", "steps"].includes(field));
