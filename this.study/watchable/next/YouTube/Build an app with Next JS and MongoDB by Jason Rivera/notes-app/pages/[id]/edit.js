import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Button, Form, Loader } from "semantic-ui-react";

export async function getServerSideProps(context) {
  const {
    query: { id }
  } = context;
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { data } = await res.json();

  return {
    props: {
      note: data
    }
  };
}

export default function Edit({ note }) {
  const [formData, setFormData] = useState({
    title: note.title,
    description: note.description
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const updateNote = useCallback(async () => {
    try {
      await fetch(`http://localhost:3000/api/notes/${router.query.id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [formData, router]);

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateNote();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors, isSubmitting, updateNote]);

  function validate() {
    const validationErrors = {};

    if (!formData.title) {
      validationErrors.title = "Title is required";
    }
    if (!formData.description) {
      validationErrors.description = "Description is required";
    }

    return validationErrors;
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    setIsSubmitting(true);
  }

  return (
    <div className="form-container">
      <h1>Update Note</h1>
      <div>
        {isSubmitting ? (
          <Loader inline="centered" active />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              label="Title"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={
                errors.title
                  ? { content: errors.title, pointing: "below" }
                  : null
              }
              fluid
            />
            <Form.TextArea
              label="Description"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={
                errors.description
                  ? { content: errors.description, pointing: "below" }
                  : null
              }
            />
            <Button type="submit">Update</Button>
          </Form>
        )}
      </div>
    </div>
  );
}
