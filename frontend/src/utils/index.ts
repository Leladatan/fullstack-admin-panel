import dayjs from "dayjs";

export const getDateFormat = (date: Date): string => {
  return dayjs(date).format("DD.MM.YY");
};
