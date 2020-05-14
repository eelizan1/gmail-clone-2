export const formatDate = (date: any) => {
  var d = new Date(date);
  const month = d.toString().substring(4, 7);
  const day = d.toString().substring(8, 10);

  return month + " " + day;
};
