import { axiosInstance } from "@/actions";
import keys from "@/constants/keys";
import { Request } from "@/types/actions";
import { UserAddType, UserType } from "@/types/actions/users";

export const usersRequest = {
  getUsers: ({ username, limit, offset }: { username: string; limit: number; offset: number }) =>
    axiosInstance
      .get<Request<UserType>>(`${keys.users}?username=${username}&limit=${limit}&offset=${offset}`)
      .then((res) => res.data),
  createUser: (payload: UserAddType) => axiosInstance.post(keys.users, payload),
  updateUser: ({ id, payload }: { id: number; payload: UserAddType }) =>
    axiosInstance.patch(`${keys.users}/${id}`, payload),
  deleteUser: (id: number) => axiosInstance.delete(`${keys.users}/${id}`),
};
