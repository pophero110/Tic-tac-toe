const TYPE = {
  human: "human",
  ai: "ai",
};
class Player {
  constructor(
    name = "Unbeatable AI",
    marker = "🤖",
    type = TYPE["human"],
    score = 0,
    image = null
  ) {
    this.name = name;
    this.marker = marker;
    this.score = score;
    this.type = type;
    this.image = image;
  }

  update(attributes) {
    const { name, marker, score, image } = attributes;
    this.name = name;
    this.marker = marker;
    this.score ||= score;
    this.image = image;
  }
}

module.exports = Player;
