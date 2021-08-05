const printTeam = (name, coach, ...players) =>
{
  console.log(`Team: ${name}`);
  console.log(`Coach: ${coach}`);
  console.log(`Players: ${players.join(", ")}`);
};

const team =
{
  name: "Libery",
  coach: "Casey Penn",
  players: ["Marge", "Aiden", "Halpert", "Sherry"]
};

printTeam(team.name, team.coach, ...team.players);

// const cities = ["Barcelona", "Cape Town", "Bordeaux"];
// const citiesCopy = ["Santiago", ...cities];
// const citiesCopy = [...cities, "Santiago"];

let cities = ["Barcelona", "Cape Town", "Bordeaux"];
cities = [...cities, "Santiago"];

// citiesCopy.push("Santiago");

console.log(cities);
// console.log(citiesCopy);