export const formatDate = (date) => {
    if (!date) return "Unknown Date";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };