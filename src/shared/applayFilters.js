const applayFiletrs = (data, filterValues) => {
  if (Object.keys(filterValues).length === 0) {
    return data;
  }
  const regexp = new RegExp(filterValues.id, 'i');
  const filteredByStatus = filterValues.status
    ? data.filter(order => order.status === filterValues.status)
    : data;
  return filterValues.id
    ? filteredByStatus.filter(order => regexp.test(order.id))
    : filteredByStatus;
};
export default applayFiletrs;
