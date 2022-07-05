import type { FC } from "react";
import { parseISO, format } from "date-fns";

interface DateProps {
  dateString: string;
}

const Date: FC<DateProps> = ({ dateString }) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
};

export default Date;
