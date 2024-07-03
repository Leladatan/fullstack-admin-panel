import { PageType } from "@/types/pages";
import Title from "antd/lib/typography/Title";
import UsersTable from "@/pages/users/_components/users.table.tsx";

const UsersPage = ({ title }: PageType) => {
  return (
    <section className={"section"}>
      <Title>{title}</Title>
      <UsersTable />
    </section>
  );
};

export default UsersPage;
