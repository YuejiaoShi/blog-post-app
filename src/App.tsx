import { ReactNode, useEffect, useState } from "react";
import { get } from "./util/fetchUtils";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import fetchingImg from "./assets/data-fetching.png";
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
    fetchPosts();
  }, []);

  let content: ReactNode;
  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />;
  }

  return (
    <main>
      <img src={fetchingImg} alt="image of fetching data process" />
      {content}
    </main>
  );
}

export default App;
