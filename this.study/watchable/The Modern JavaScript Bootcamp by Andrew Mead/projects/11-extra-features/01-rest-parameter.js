const calculateAverage = (thing, ...numbers) =>
{
  let sum = 0;
  numbers.forEach(num => sum += num);
  const average = sum / numbers.length;
  return `The average ${thing} is ${average}`;
};

// console.log(calculateAverage("age", 0, 100, 88, 64));

// Challenge.

const printTeam = (name, coach, ...players) =>
{
  console.log(`Team: ${name}`);
  console.log(`Coach: ${coach}`);
  console.log(`Players: ${players.join(", ")}`);
};

printTeam("Liberty", "Casey Penn", "Marge", "Aiden", "Halpert", "Sherry");