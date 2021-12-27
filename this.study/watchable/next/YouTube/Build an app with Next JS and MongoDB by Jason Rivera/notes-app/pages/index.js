import Link from "next/link";
import { Button, Card } from "semantic-ui-react";

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/notes");
  const { data } = await res.json();

  return {
    props: {
      notes: data
    }
  };
}

export default function Home({ notes }) {
  return (
    <div className="notes-container">
      <h1>Notes</h1>
      <div className="grid wrapper">
        {notes.map((note) => (
          <div key={note._id}>
            <Card>
              <Card.Content>
                <Card.Header>
                  <Link href={`/${note._id}`}>
                    <a>{note.title}</a>
                  </Link>
                </Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Link href={`/${note._id}`}>
                  <a>
                    <Button primary>View</Button>
                  </a>
                </Link>
                <Link href={`/${note._id}/edit`}>
                  <a>
                    <Button>Edit</Button>
                  </a>
                </Link>
              </Card.Content>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
