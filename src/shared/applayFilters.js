const applayFiletrs = (data, filterValues) => {
  const regexp = new RegExp(filterValues.id, 'i');
  return (filterValues.status
    ? data.filter(order => order.status === filterValues.status)
    : data
  ).filter(order => (filterValues.id ? regexp.test(order.id) : true));
};
export default applayFiletrs;
