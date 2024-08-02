export async function get(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
