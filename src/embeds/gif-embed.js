export class GifEmbed {
  constructor({ color, title, gifUrl }) {
    this.color = color;
    this.title = title;
    this.gifUrl = gifUrl;
  }

  toJSON() {
    return {
      color: this.color,
      title: this.title,
      image: { url: this.gifUrl },
    };
  }
}
