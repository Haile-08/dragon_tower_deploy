function random_postion() {
  let egg1 = Math.floor(Math.random() * 3) + 1;
  let egg2 = Math.floor(Math.random() * 3) + 1;
  while (egg2 === egg1) {
    egg2 = Math.floor(Math.random() * 3) + 1;
  }

  return { egg1, egg2 };
}

export default random_postion;
