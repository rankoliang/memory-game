function randInt(n) {
  return Math.floor(Math.random() * n);
}

function shuffle(array) {
  const shuffled = [];
  const remaining = [...array];

  while (remaining.length > 0) {
    const randIndex = randInt(remaining.length);
    const selection = remaining[randIndex];

    remaining.splice(randIndex, 1);

    shuffled.push(selection);
  }

  return shuffled;
}

export { shuffle }
