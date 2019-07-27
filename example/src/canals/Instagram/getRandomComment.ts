import { getRandomUser } from './getRandomUser';

let idCounter = 0;

const comments = ['I love it!', 'Splendid 😍', 'What is your camera ?', 'This is beautiful!!'];

function getRandomComment() {
  idCounter = idCounter + 1;
  return {
    id: idCounter,
    comment: comments[Math.floor(Math.random() * comments.length)],
    author: getRandomUser(),
  };
}

export function getRandomComments() {
  const numberOfComments = Math.ceil(Math.random() * 3);
  let result = [];
  for (let index = 0; index < numberOfComments; index++) {
    result.push(getRandomComment());
  }
  return result;
}
