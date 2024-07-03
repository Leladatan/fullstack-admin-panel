import { axiosInstance } from "@/actions";
import keys from "@/constants/keys";
import { PostAddType } from "@/types/actions/posts";

export const postsRequest = {
  getPosts: ({ title, limit, offset }: { title: string; limit: number; offset: number }) =>
    axiosInstance.get(`${keys.posts}?title=${title}&limit=${limit}&offset=${offset}`).then((res) => res.data),
  createPost: (payload: PostAddType) => axiosInstance.post(keys.posts, payload),
  updatePost: ({ id, payload }: { id: number; payload: PostAddType }) =>
    axiosInstance.patch(`${keys.posts}/${id}`, payload),
  deletePost: (id: number) => axiosInstance.delete(`${keys.posts}/${id}`),
};
