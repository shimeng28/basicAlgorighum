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

class WordDictionary {
  constructor() {
    this.root = new Node();
  }

  addWord(word) {
    let curr = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!curr.next.has(word[i])) {
        curr.next.set(word[i], new Node());
      }

      curr = curr.next.get(word[i]);
    }

    curr.isWord = true;
  }

  match(node, word, index) {
    const length = word.length;
    if (length === index) {
      return node.isWord;
    }

    let curr = node;
    for (let i = index; i < length; i++) {
      const char = word[i];
      if (char === '.') {
        for (let nodeItem of curr.next.values()) {
          if(this.match(nodeItem, word, i+1)) {
            return true;
          }
        }
        return false;
      } else {
        if (!curr.next.has(char)) {
          return false;
        }

        curr = curr.next.get(char);
      }
    }

    return curr.isWord;
  }

  search(word) {
    return this.match(this.root, word, 0);
  }
}
