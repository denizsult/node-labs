export const formatDate = (dateString: string, withTime?: boolean): string => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";

  const day = date.getDate();
  const month = date.toLocaleString("en-US", {
    month: withTime ? "long" : "short",
  });
  const year = date.getFullYear();

  if (!withTime) {
    return `${day} ${month} ${year}`;
  }

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${month} ${day}, ${year} at ${time}`;
};
