export const getRunTime = (runtimeInMinutes) => {
    const totalMinutes = Math.floor(runtimeInMinutes);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0 || hours === 0) parts.push(`${minutes}m`);

    return parts.join(" ");
  };