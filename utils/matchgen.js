const timeslotGenerator = ({ date, opensAt, closesAt, futsal, createdBy }) => {
  let match = [];

  for (let index = opensAt; index < closesAt; index++) {
    const temp = {
      date: date,
      startTime: index,
      endTime: index + 1,
      futsal,
      createdBy,
    };
    match = [...match, temp];
  }
  return match;
};

module.exports = timeslotGenerator;
