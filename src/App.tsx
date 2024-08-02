import { useEffect, useState } from "react";
import { get } from "./util/fetchUtils";
import { BlogPost } from "./components/BlogPosts";

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[] | undefined>();

  useEffect(() => {
    async function fetchPosts() {
      const data = await get("https://jsonplaceholder.typicode.com/posts");
    }
  }, []);

  return <h1>Data Fetching!</h1>;
}

export default App;
