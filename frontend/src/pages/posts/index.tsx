import { PageType } from "@/types/pages";
import Title from "antd/lib/typography/Title";
import PostsTable from "@/pages/posts/_components/posts.table.tsx";

const PostsPage = ({ title }: PageType) => {
  return (
    <section className={"section"}>
      <Title>{title}</Title>
      <PostsTable />
    </section>
  );
};

export default PostsPage;
