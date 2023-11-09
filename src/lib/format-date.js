const dateOptions = {
  day: "2-digit",
  year: "numeric",
  month: "numeric",
};

export const convertToDDMMYY = (timeStamp) => {
  const rawDate = new Date(timeStamp);
  return rawDate.toLocaleDateString("vi-VN", dateOptions);
};
