let idCounter = 0;

const users = [
  {
    color: 'green',
    emoji: '💵',
    name: 'Joe Dalton',
    description:
      "🏜 I'm a villain in the FarWest\n Try to long press a picture to see a fullscreen sneak peek !",
  },
  {
    color: 'blue',
    emoji: '🛰',
    name: 'Luke Skywalker',
    description:
      'Casting for a sitcom\n Try to long press a picture to see a fullscreen sneak peek !',
  },
  {
    color: 'red',
    emoji: '👀',
    name: 'Mario',
    description: 'Looking for Peach\n Try to long press a picture to see a fullscreen sneak peek !',
  },
  {
    color: 'yellow',
    emoji: '🎤',
    name: 'Christophe Maé',
    description: "🎶 J'avoueeeeee\n Try to long press a picture to see a fullscreen sneak peek !",
  },
];

export function getRandomUser() {
  idCounter = idCounter + 1;
  return users[Math.floor(Math.random() * users.length)];
}
