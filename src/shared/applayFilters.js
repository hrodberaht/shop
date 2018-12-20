const applayFiletrs = (data, filterValues) => (filterValues.status ? data.filter(order => order.status === filterValues.status) : data).filter(
  order => (filterValues.id ? order.id.toLowerCase().includes(filterValues.id) : true),
);
export default applayFiletrs;
