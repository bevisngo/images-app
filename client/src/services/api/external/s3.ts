import axios from "axios";
import { WRITE_SERVICE_API } from "../provider";

async function uploadFileToS3(file: File, presignedUrl: string) {
  const response = await axios.put(presignedUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });

  if (response.status !== 200) {
    throw new Error(`Failed to upload file ${file.name} to S3`);
  }

  console.log(`Successfully uploaded ${file.name} to S3`);
}

export async function uploadFiles(files: File[]) {
  const payload = files.map((file) => ({
    name: file.name,
    mimeType: file.type,
  }));

  WRITE_SERVICE_API.post("/upload/presigned-urls", { files: payload }).then(
    async (response) => {
      const presignedObjs: string[] = response.data;
      const uploadPromises = presignedObjs.map((presignedObj, index) => {
        return uploadFileToS3(files[index], presignedObj);
      });
      try {
        await Promise.all(uploadPromises);
        console.log("All files uploaded successfully");
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  );
}
