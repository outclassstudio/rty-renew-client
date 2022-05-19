export default function useDate() {
  const current = new Date();
  const year = current.getFullYear();
  let month = ("0" + (current.getMonth() + 1)).slice(-2);
  let day = ("0" + current.getDate()).slice(-2);
  let hour = ("0" + current.getHours()).slice(-2);
  let min = ("0" + current.getMinutes()).slice(-2);
  const now = `${year}-${month}-${day}`;

  return { now, hour, min };
}
