let idCounter = 0;

const users = [
  {
    color: 'green',
    emoji: '💵',
    name: 'Joe Dalton',
    description: "🏜 I'm a villain in the FarWest",
  },
  {
    color: 'blue',
    emoji: '🛰',
    name: 'Luke Skywalker',
    description: 'Casting for a sitcom',
  },
  {
    color: 'red',
    emoji: '👀',
    name: 'Mario',
    description: 'Looking for Peach',
  },
  {
    color: 'yellow',
    emoji: '🎤',
    name: 'Christophe Maé',
    description: "🎶 J'avoueeeeee",
  },
];

export function getRandomUser() {
  idCounter = idCounter + 1;
  return users[Math.floor(Math.random() * users.length)];
}
