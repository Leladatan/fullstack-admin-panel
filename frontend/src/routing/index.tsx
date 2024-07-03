import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "@/constants/routes";
import MainLayout from "@/layout";
import UsersPage from "@/pages/users";
import PostsPage from "@/pages/posts";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path={routes.users.url} element={<UsersPage title={routes.users.label} />} />
          <Route path={routes.posts.url} element={<PostsPage title={routes.posts.label} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
