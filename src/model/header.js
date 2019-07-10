let nextHeaderIndex = 0;

export default class HeaderObject {
  constructor() {
    this.index = ++nextHeaderIndex;
    this.key = "";
    this.value = "";
  }
}
