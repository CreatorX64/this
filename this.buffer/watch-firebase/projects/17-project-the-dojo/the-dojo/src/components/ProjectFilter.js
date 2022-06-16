import styles from "styles/ProjectFilter.module.css";

const filterList = [
  "all",
  "mine",
  "development",
  "design",
  "marketing",
  "sales"
];

const ProjectFilter = ({ currentFilter, onFilterChange }) => {
  const handleClick = (newFilter) => {
    onFilterChange(newFilter);
  };

  return (
    <div className={styles["project-filter"]}>
      <ul>
        <p>Filter by:</p>

        {filterList.map((f) => (
          <li key={f}>
            <button
              onClick={() => handleClick(f)}
              className={currentFilter === f ? styles.active : ""}
            >
              {f}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectFilter;
