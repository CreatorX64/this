import { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useCollection } from "../../hooks/useCollection";
import styles from "./Create.module.css";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" }
];

export function Create() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [formError, setFormError] = useState(null);
  const { documents } = useCollection("users");
  const { response, addDocument } = useFirestore("projects");
  const { user } = useAuthContext();

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return {
          value: user,
          label: user.displayName
        };
      });

      setUsers(options);
    }
  }, [documents]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    setFormError(null); // In case there was an error before

    // Form validation
    if (!category) {
      setFormError("Please select a project category");
      return;
    } else if (assignedUsers.length < 1) {
      setFormError("Please assign the project to at least 1 user");
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    };

    const assignedUsersList = assignedUsers.map((au) => {
      return {
        displayName: au.value.displayName,
        photoURL: au.value.photoURL,
        id: au.value.id
      };
    });

    const newProject = {
      name,
      details,
      category,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList
    };

    await addDocument(newProject);
    if (!response.error) {
      navigate("/");
    }
  }

  return (
    <div className={styles.form}>
      <h2 className="page-title">Create a New Project</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name</span>
          <input
            type="text"
            onChange={(evt) => setName(evt.target.value)}
            value={name}
            required
          />
        </label>

        <label>
          <span>Project details</span>
          <textarea
            onChange={(evt) => setDetails(evt.target.value)}
            value={details}
            required
          />
        </label>

        <label>
          <span>Due date</span>
          <input
            type="date"
            onChange={(evt) => setDueDate(evt.target.value)}
            value={dueDate}
            required
          />
        </label>

        <label>
          <span>Project category</span>
          <Select
            onChange={(option) => setCategory(option.value)}
            options={categories}
          />
        </label>

        <label>
          <span>Assign to</span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>

        <button className="btn">Add project</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
