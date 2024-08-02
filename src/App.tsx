import { useEffect, useState } from "react";
import { get } from "./util/fetchUtils";
import { BlogPost } from "./components/BlogPosts";

type RawBlogData = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[] | undefined>();

  useEffect(() => {
    async function fetchPosts() {
      const data = (await get(
        "https://jsonplaceholder.typicode.com/posts"
      )) as RawBlogData[];

      const blogPosts: BlogPost[] = data.map((rawPost) => {
        return {
          id: rawPost.id,
          title: rawPost.title,
          text: rawPost.body,
        };
      });
      setFetchedPosts(blogPosts);
    }
    fetchPosts;
  }, []);

  return <h1>Data Fetching!</h1>;
}

export default App;
