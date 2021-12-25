import styles from "./Dashboard.module.css";

const filterList = [
  "all",
  "mine",
  "development",
  "design",
  "marketing",
  "sales"
];

export function ProjectFilter({ currentFilter, onChangeFilter }) {
  return (
    <div className={styles.projectFilter}>
      <nav>
        <p>Filter by:</p>
        {filterList.map((filter) => (
          <button
            key={filter}
            className={currentFilter === filter ? styles.active : null}
            onClick={() => onChangeFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </nav>
    </div>
  );
}
