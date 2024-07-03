export type UserType = {
  id: number;
  surname: string;
  name: string;
  patronymic: string;
  username: string;
  email: string;
  createdAt: Date;
  updateAt: Date;
};

export type UserAddType = {
  surname: string;
  name: string;
  patronymic: string;
  username: string;
  email: string;
};
