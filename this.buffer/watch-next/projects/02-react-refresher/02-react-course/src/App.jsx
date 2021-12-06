import Todo from "./components/Todo";

export default function App() {
  return (
    <div>
      <h1>My Todos</h1>
      <Todo text="Learn React" />
      <Todo text="Master React" />
      <Todo text="Start Studying Next.js" />
    </div>
  );
}
