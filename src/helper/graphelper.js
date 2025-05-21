export default function getYearGroups(months, years) {
  const result = [];
  let start = 0;

  for (let i = 1; i <= years.length; i++) {
    if (i === years.length || years[i] !== years[start]) {
      const groupLength = i - start;
      const mid = Math.floor(groupLength / 2);
      for (let j = 0; j < groupLength; j++) {
        result.push(j === mid ? years[start] : "");
      }
      start = i;
    }
  }

  return result;
}
