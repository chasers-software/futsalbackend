const timeslotGenerator = ({
  date,
  opensAt,
  closesAt,
  futsal,
  price,
  futsalName,
  location,
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
      futsalName,
      location,
    };
    match = [...match, temp];
  }
  return match;
};

module.exports = timeslotGenerator;
