import { get } from "./util/fetchUtils";

function App() {
  get("https://jsonplaceholder.typicode.com/posts");

  return <h1>Data Fetching!</h1>;
}

export default App;
