import { ReactNode, useEffect, useState } from "react";
import { get } from "./util/fetchUtils";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import fetchingImg from "./assets/data-fetching.png";
import ErrorMessage from "./components/ErrorMessage";
type RawBlogData = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[] | undefined>();
  const [isFetching, setIsFetching] = useState(false);
  const [err, setErr] = useState<string>();

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      try {
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
      } catch (err) {
        if (err instanceof Error) {
          setErr("Failed to fetch posts");
        }
      }
      setIsFetching(false);
    }
    fetchPosts();
  }, []);

  let content: ReactNode;
  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />;
  }
  if (isFetching) {
    content = <p id="loading-fallback">Fetching posts...</p>;
  }

  if (err) {
    content = <ErrorMessage text={err} />;
  }

  return (
    <main>
      <img src={fetchingImg} alt="image of fetching data process" />
      {content}
    </main>
  );
}

export default App;
