const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_API;
const UPLOAD_PRESET = "insta-clone";
const CLOUD_NAME = "semugeshi";

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("cloud_name", CLOUD_NAME);

  const response = await fetch(CLOUDINARY_URL, {
    method: "post",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  const data = await response.json();
  return data.url;
}
