import { createClient } from "@supabase/supabase-js";

const url = "https://nlmiybunqljvlfcbthlc.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sbWl5YnVucWxqdmxmY2J0aGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNDI1NzEsImV4cCI6MjA2NTcxODU3MX0.bTS1NzdfdBAuqLnINGlySelo7n3UtIq7Bqjw7FAh4OA";

const supabase = createClient(url, key);

export default function mediaUpload(file) {
  const mediaUploadPromise = new Promise((resolve, reject) => {
    if (file == null) {
      reject("Not selected file");
      return;
    }
    const timestamp = new Date().getTime();
    const newName = timestamp + "_" + file.name;

    supabase.storage
      .from("images")
      .upload(newName, file, {
        upsert: false,
        cacheControl: "3600",
      })
      .then((response) => {
        const publicUrl = supabase.storage.from("images").getPublicUrl(newName)
          .data.publicUrl;
        // console.log("Image uploaded successfully:", response);
        // console.log("Public URL:", publicUrl);
        resolve(publicUrl);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        reject("error uploading image");
      });
  });
  return mediaUploadPromise;
}
