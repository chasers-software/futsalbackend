const timeslotGenerator = ({
  date,
  opensAt,
  closesAt,
  futsal,
  price,
  createdBy,
}) => {
  let match = [];

  for (let index = opensAt; index < closesAt; index++) {
    const temp = {
      date: date,
      startTime: index,
      endTime: index + 1,
      futsal,
      createdBy,
      price,
    };
    match = [...match, temp];
  }
  return match;
};

module.exports = timeslotGenerator;
