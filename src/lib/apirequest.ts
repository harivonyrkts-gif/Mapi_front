export const GET = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data ?? [];
  } catch (error) {
    console.error('Erreur API :', error);
    return [];
  }
};