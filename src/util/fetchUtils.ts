export async function get(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = res.json() as unknown;
    return data;
    // could also use 3-party (like Zod) to check data structure
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
