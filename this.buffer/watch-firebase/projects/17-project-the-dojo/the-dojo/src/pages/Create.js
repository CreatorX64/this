import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import useAuthContext from "hooks/useAuthContext";
import useCollection from "hooks/useCollection";
import useFirestore from "hooks/useFirestore";
import styles from "pages/Create.module.css";

// This could've come from Firebase but for simplicity's sake, we'll
// define our categories here
const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" }
];

const Create = () => {
  const { user } = useAuthContext();
  const { documents: allUsers } = useCollection("users");
  const [userOptions, setUserOptions] = useState([]);
  const { addDocument, response } = useFirestore("projects");

  // Form fields & error states
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate form fields

    setFormError(null);

    if (!category) {
      return setFormError("Please select a project category");
    } else if (assignedUsers.length < 1) {
      return setFormError("Please assign the project to at least one user");
    }

    // Create project object to be saved to Firebase

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    };

    const assignedUsersList = assignedUsers.map((assignedUser) => ({
      displayName: assignedUser.value.displayName,
      photoURL: assignedUser.value.photoURL,
      id: assignedUser.value.id
    }));

    const project = {
      name,
      details,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      category: category.value,
      comments: [],
      createdBy,
      assignedUsersList
    };

    addDocument(project);
  };

  // Populate the "users" state once useCollection() hook fetches all users
  useEffect(() => {
    if (allUsers) {
      const options = allUsers.map((user) => ({
        value: user,
        label: user.displayName
      }));

      setUserOptions(options);
    }
  }, [allUsers]);

  // If there's no error from adding the new project, redirect to dashboard
  useEffect(() => {
    if (response.isSuccess) {
      navigate("/");
    }
  }, [response, navigate]);

  return (
    <div className={styles["create-form"]}>
      <h2 className="page-title">Create a new project</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Project details:</span>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Set due date:</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Project category:</span>
          <Select
            options={categories}
            value={category}
            onChange={(option) => setCategory(option)}
          />
        </label>

        <label>
          <span>Assign to:</span>
          <Select
            options={userOptions}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>

        {response.isPending ? (
          <button className="btn" disabled>
            Loading...
          </button>
        ) : (
          <button className="btn">Add Project</button>
        )}

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
