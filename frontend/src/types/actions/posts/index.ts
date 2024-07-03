import { UserType } from "@/types/actions/users";

export type PostType = {
  id: number;
  title: string;
  description: string;
  userId: number;
  user: UserType;
  createdAt: Date;
  updateAt: Date;
};

export type PostAddType = {
  title: string;
  description: string;
  userId: number;
};

export type PostEditType = {
  title: string;
  description: string;
  userId: number | string;
};
