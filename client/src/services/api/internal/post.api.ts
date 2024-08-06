import { READ_SERVICE_API, WRITE_SERVICE_API } from "../provider";

interface Post {
  caption: string;
  images: {
    filename: string;
    url: string;
    path: string;
    alt?: string;
  }[];
}

export async function createPostAPI(payload: Post) {
  return WRITE_SERVICE_API.post("/posts", payload)
    .then(async (response) => response.data)
    .catch(console.log);
}

export async function getPostsAPI(skip: number, limit: number) {
  return READ_SERVICE_API.get(`/posts?skip=${skip}&limit=${limit}`)
    .then(async (response) => response.data)
    .catch(console.log);
}

export async function getPostAPI(id: number) {
  return READ_SERVICE_API.get(`/posts/${id}`)
    .then(async (response) => response.data)
    .catch(console.log);
}

export async function getPostsHomeAPI(skip: number, limit: number) {
  return READ_SERVICE_API.get(`/posts/home?skip=${skip}&limit=${limit}`)
    .then(async (response) => response.data)
    .catch(console.log);
}
