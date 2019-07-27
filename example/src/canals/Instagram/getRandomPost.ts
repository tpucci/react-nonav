let idCounter = 0;

const colors = [
  '#E7EDE5',
  '#C0E3F5',
  '#87AAC1',
  '#AF7E6B',
  '#5F4231',
  '#A8226C',
  '#7A86B2',
  '#C9C2CC',
  '#D4911F',
  '#686A27',
  '#B65949',
  '#633823',
  '#1F1E20',
  '#7F7B84',
  '#DED4D3',
  '#F95738',
  '#FF2C55',
  '#9A48D0',
  '#52FFB8',
  '#241909',
];

const emojis = [
  '🏀',
  '🤖',
  '💵',
  '🤼‍♂️',
  '🚴‍♂️',
  '🧗‍♀️',
  '🏊‍♂️',
  '🌋',
  '🏥',
  '🌠',
  '🎆',
  '🛣',
  '📸',
  '🛍',
  '🧸',
  '🏴‍☠️',
  '😻',
];

export function getRandomPost() {
  idCounter = idCounter + 1;
  return {
    id: idCounter,
    color: colors[Math.floor(Math.random() * colors.length)],
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
  };
}

export function getRandomPosts() {
  const numberOfRows = Math.ceil(Math.random() * 10);
  let result = [];
  for (let index = 0; index < numberOfRows; index++) {
    result.push([getRandomPost(), getRandomPost(), getRandomPost()]);
  }
  return result;
}
