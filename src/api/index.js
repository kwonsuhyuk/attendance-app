import { get, getDatabase, ref } from "firebase/database";

const db = getDatabase();

export async function fetchData(path) {
  try {
    const snapshot = await get(ref(db, path));
    return snapshot.val() || null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function getUser(currentUser) {
  if (!currentUser) return null;
  const path = `companyCode/${currentUser.photoURL}/users/${currentUser.uid}`;
  return await fetchData(path);
}

export async function getCompanyInfo(currentUser) {
  if (!currentUser) return null;
  const path = `companyCode/${currentUser.photoURL}/companyInfo`;
  return await fetchData(path);
}
