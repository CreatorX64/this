import { parseISO, format } from "date-fns";
import type { FC } from "react";

interface Props {
  dateString: string;
}

const FormattedDate: FC<Props> = ({ dateString }) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
};

export default FormattedDate;
