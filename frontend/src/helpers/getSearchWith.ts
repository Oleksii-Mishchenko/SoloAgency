export const getSearchWith = (
  params: { [key: string]: string | number | null },
  searchParams?: URLSearchParams,
) => {
  const newParams = new URLSearchParams(searchParams);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value.toString());
    }
  });

  return newParams.toString();
};
