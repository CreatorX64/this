import { TIMEOUT_SEC } from "./config";

const timeout = (s) =>
  new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });

export const fetchJSON = async (url, uploadData = null) => {
  try {
    const req = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(uploadData)
        })
      : fetch(url);

    const res = await Promise.race([req, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }

    return data;
  } catch (error) {
    // You can do some custom logging logic here
    throw err;
  }
};
