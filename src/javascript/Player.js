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
  constructor({ name, marker, score, type, id }) {
    this.id = id;
    this.name = name;
    this.marker = marker;
    this.score = score;
    this.type = type;
  }

  update({ name, marker, score, id, type }) {
    if (name) this.name = name;
    if (marker) this.marker = marker;
    if (score) this.score = score;
    if (id) this.id = id;
    if (type) this.type = type;
  }
}

module.exports = {
  Player,
  PLAYER_TYPE,
  WINNING_COMBINATIONS,
};
