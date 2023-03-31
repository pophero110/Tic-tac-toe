const TYPE = {
  HUMAN: "human",
  AI: "ai",
};
class Player {
  constructor(
    { name, marker, score, image, type } = {
      name: "Unbeatable AI",
      marker: "🤖",
      type: TYPE.HUMAN,
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
  TYPE,
};
