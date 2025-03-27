export async function fetchHubData() {
  const res = await fetch("https://d1q0vy0v52gyjr.cloudfront.net/hub.json");
  return res.json();
}

export async function fetchCollectionData(id: string) {
  const res = await fetch(
    `https://d1q0vy0v52gyjr.cloudfront.net/collections/${id}.json`,
  );
  return res.json();
}
