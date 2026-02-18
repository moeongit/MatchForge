export function formatRegion(region) {
  if (!region) return "-";
  return String(region).toUpperCase();
}

export function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString();
}
