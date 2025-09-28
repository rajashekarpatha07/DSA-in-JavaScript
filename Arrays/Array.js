class Myarray {
  constructor() {
    this.data = {};
    this.length = 0;
  }
  push(data) {
    this.data[this.length] = data;
    this.length++;
    return this.data;
  }
  get(index) {
    if (index >= this.length) return undefined;
    return this.data[index];
  }

  getByvalue(value) {
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] === value) {
        console.log(i);
        return i; // return index if found
      }
    }
    return -1; // if not found
  }

  pop() {
    if (this.length <= 0) return false;
    const lastitem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastitem;
  }
  shift() {
    if (this.length === 0) return undefined;

    const firstItem = this.data[0];
    for (let i = 0; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length - 1]; // delete last duplicate
    this.length--;
    return firstItem;
  }
}

const array = new Myarray();
array.push("mango");
array.push("apple");
array.push("banana");
array.push("kiwi");
// array.pop();
array.shift();
console.log(array);
