import { NotebookPen, UserIcon } from "lucide-react";
import routes from "@/constants/routes";

export const getNavItems = () => {
  return [
    {
      key: routes.users.url,
      label: routes.users.label,
      url: routes.users.url,
      icon: UserIcon,
    },
    {
      key: routes.posts.url,
      label: routes.posts.label,
      url: routes.posts.url,
      icon: NotebookPen,
    },
  ];
};
