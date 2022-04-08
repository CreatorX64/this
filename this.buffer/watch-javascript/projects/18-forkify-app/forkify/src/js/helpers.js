import { TIMEOUT_SEC } from "./config";

const timeout = (s) =>
  new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });

export const getJSON = async (url) => {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    // You can do some custom logging logic here
    throw err;
  }
};
