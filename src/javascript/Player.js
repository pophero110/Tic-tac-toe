const WINNING_COMBINATIONS = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const PLAYER_TYPE = {
  HUMAN: "human",
  AI: "ai",
};
class Player {
  constructor(
    { name, marker, score, image, type } = {
      name: "You",
      marker: "X",
      type: PLAYER_TYPE.HUMAN,
      score: 0,
      image: null,
    }
  ) {
    this.name = name;
    this.marker = marker;
    this.score = score;
    this.type = type;
    this.image = image;
  }

  update({ name, marker, score, image }) {
    if (name) this.name = name;
    if (marker) this.marker = marker;
    if (score !== 0) this.score = score;
    if (image) this.image = image;
  }
}

module.exports = {
  Player,
  PLAYER_TYPE,
  WINNING_COMBINATIONS,
};
