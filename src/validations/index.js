export const validate = (schema, data) => {
  try {
    const validaData = schema.parse(data);
    return { data: validaData };
  } catch (error) {
    return { error: error.errors };
  }
};
