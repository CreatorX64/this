import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Loader } from "semantic-ui-react";

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

export default function NoteDetail({ note }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const deleteNote = useCallback(async () => {
    const noteId = router.query.id;

    try {
      await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: "DELETE"
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [router]);

  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting, deleteNote]);

  function open() {
    setIsConfirmOpen(true);
  }

  function close() {
    setIsConfirmOpen(false);
  }

  async function handleDelete() {
    setIsDeleting(true);
    close();
  }

  return (
    <div className="note-container">
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <Button color="red" onClick={open}>
            Delete
          </Button>
        </>
      )}

      <Confirm open={isConfirmOpen} onCancel={close} onConfirm={handleDelete} />
    </div>
  );
}
