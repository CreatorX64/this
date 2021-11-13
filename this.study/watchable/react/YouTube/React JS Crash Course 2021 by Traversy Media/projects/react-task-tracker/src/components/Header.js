import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const Header = ({ title, onAdd, isAddShown }) =>
{
  var location = useLocation();

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" &&
        <Button
          color={isAddShown ? "gray" : "green"}
          text={isAddShown ? "Close" : "Add"}
          onClick={onAdd}
        />}
    </header>
  );
};

Header.defaultProps =
{
  title: "Task Tracker"
};

// We can define data types & requirements of props. Because we have a
// default prop value, the "isRequired" part has no effect in this case.
Header.propTypes =
{
  title: PropTypes.string.isRequired
};

export default Header;