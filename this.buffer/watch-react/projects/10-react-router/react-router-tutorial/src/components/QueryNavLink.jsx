import { useLocation, NavLink } from "react-router-dom";

export const QueryNavLink = ({ to, ...props }) => {
  const location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
};
