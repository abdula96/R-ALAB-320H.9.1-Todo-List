import { Link } from "react-router";

export default function Home() {
  return (
    <div>
      <h2>Home Page</h2>
      <Link to="/modify">Click here to modify todo list tasks</Link>
    </div>
  );
}
