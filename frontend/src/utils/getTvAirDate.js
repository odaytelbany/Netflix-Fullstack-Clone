export const getTvAirDate = (item) => {
    if (item.in_production) {
      return `${item?.first_air_date?.split("-")[0]}- `;
    } else {
      const startYear = item?.first_air_date?.split("-")[0];
      const endYear = item?.last_air_date?.split("-")[0];
      if (startYear === endYear) {
        return `${startYear}`;
      } else {
        return `${startYear}-${endYear}`;
      }
    }
  };