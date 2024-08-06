import axios from "axios";
import { WRITE_SERVICE_API } from "../provider";

interface PresignedData {
  url: string;
  mimeType: string;
}
interface GetPresignedUrl {
  filename: string;
  mimeType: string;
  path: string;
  url: string;
}

const uploadFileToS3 = async (
  file: File,
  presignedData: PresignedData
): Promise<PresignedData | null> => {
  const { url, mimeType } = presignedData;

  try {
    const response = await axios.put(url, file, {
      headers: {
        "Content-Type": mimeType,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    return {
      url,
      mimeType,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export async function uploadFiles(files: File[], type: string = "post") {
  const payload = files.map((file) => ({
    filename: file.name,
    mimeType: file.type,
  }));

  return WRITE_SERVICE_API.post("/upload/presigned-urls", {
    files: payload,
    type,
  }).then(async (response) => {
    const presignedObjs: GetPresignedUrl[] = response.data;
    const uploadPromises = presignedObjs.map((presignedObj, index) => {
      return uploadFileToS3(files[index], {
        url: presignedObj.url,
        mimeType: presignedObj.url,
      });
    });
    try {
      await Promise.all(uploadPromises);
      return presignedObjs;
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  });
}
