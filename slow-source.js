// A remote source that is slow to answer and whose data changes over time.
export async function fetchData() {
  const delay = 5000 + Math.random() * 5000;
  await new Promise((resolve) => setTimeout(resolve, delay));
  return { fetchedAt: new Date().toISOString(), value: Math.floor(Math.random() * 1000) };
}
