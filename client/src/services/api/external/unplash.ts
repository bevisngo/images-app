import axios from "axios";

const unsplashInstance = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
  },
});

interface UnsplashImage {
  id: string;
  description: string | null;
  urls: {
    small: string;
    regular: string;
  };
}

export const fetchUnsplashImages = async (
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<UnsplashImage[]> => {
  try {
    const response = await unsplashInstance.get("/search/photos", {
      params: {
        query,
        page,
        per_page: perPage,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching images from Unsplash:", error);
    throw error;
  }
};

export default unsplashInstance;
