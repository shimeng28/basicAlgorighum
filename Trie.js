class Node {
  constructor(isWord = false) {
    this.isWord = isWord;
    this.next = new Map();
  }
}

class Trie {
  constructor() {
    this.root = new Node();
    this.size = 0;
  }

  add(word) {
    let curr = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!curr.next.has(word[i])) {
        curr.next.set(word[i], new Node());
      }
      curr = curr.next.get(word[i]);
    }

    if (!curr.isWord) {
      curr.isWord = true;
      this.size++;
    }
  }

  contains(word) {
    let curr = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!curr.next.has(word[i])) {
        return false;
      }
      curr = curr.next.get(word[i]);
    }

    return curr.isWord;
  }
  _remove(word, length) {
    if (!length) return true;

    let parent = this.root;
    let curr = this.root;

    for (let i = 0; i < length; i++) {
      parent = curr;
      curr = curr.next.get(word[i]);
    }

    if (curr.next.keys().length) {
      curr.isWord = false;
      return true;
    } else {
      parent.next.delete(word[length - 1]);
      return this._remove(word, length - 1);
    }
  }

  remove(word) {
    let curr = this.root;
    const length = word.length;
    for (let i = 0; i < length; i++) {
      if (!curr.next.has(word[i])) {
        return false;
      }
      curr = curr.next.get(word[i]);
    }

    return this._remove(word, length);
  }
  
  isPrefix(prefix) {
    let curr = this.root;
    for (let i = 0; i < prefix.length; i++) {
      if (!curr.next.has(prefix[i])) {
        return false;
      }
      cur = cur.next.get(prefix[i]);
    }

    return true;
  }

  getSize() {
    return this.size;
  }
}
