export const formatDateAsRowHeaderList = dateString =>
  dateString.split(', ').reduce((dayLines, dayLineText, index) => {
    if (index === 0) {
      return [`${dayLineText},`];
    }

    if (index === 1) {
      return [...dayLines, `${dayLineText}`];
    }
    dayLines[1] += `, ${dayLineText}`;
    return dayLines;
  }, []);
