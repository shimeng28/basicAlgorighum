class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class BST {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  getHeight(node) {
    if (!node) return 0;

    return node.height
  }

  getBalanceFactory(node) {
    if (!node) return 0;

    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  rightRotate(node) {
    const child = node.left;
    const child_right = child.right;

    child.right = node;
    node.left = child_right;

    return child;
  }

  leftRotate(node) {
    const child = node.right;
    const child_left = child.left;

    child.left = node;
    node.right = child_left;

    return child;
  }

  keepBalance(node) {
    if (!node) return node;

    const balanceFactory = this.getBalanceFactory(node);
    const leftChildBalanceFactory = this.getBalanceFactory(node.left);
    const rightChildBalanceFactory = this.getBalanceFactory(node.right);
  
    if (Math.abs(balanceFactory) > 1) {
      console.log(`balanceFactory: ${balanceFactory}`);
    }


    // RR 右旋
    if (balanceFactory > 1 && leftChildBalanceFactory > 0) {
      return this.rightRotate(node);
    }

    // LR 左旋
    if (balanceFactory < -1 && rightChildBalanceFactory < 0) {
      return this.leftRotate(node);
    } 

    // LRR 左右旋
    if (balanceFactory > 1 && leftChildBalanceFactory < 0) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    // RLR 右左旋
    if (balanceFactory < -1 && rightChildBalanceFactory > 0) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  insert(node, key, value) {
    if (!node) {
      this.size++;
      return new Node(key, value);
    }

    if (key > node.key) {
      node.right = this.insert(node.right, key, value);
    } else if (key < node.key) {
      node.left = this.insert(node.left, key, value);
    } else {
      node.value = value;
    }

    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;

    return this.keepBalance(node)
  }

  push(key, value) {
    this.root = this.insert(this.root, key, value);
  }



  get(node, key) {
    if (!node) {
      return null;
    }

    if (node.key > key) {
      return this.get(node.left, key);
    } else if (node.key < key) {
      return this.get(node.right, key);
    }

    return node;
  }

  getMaxNode(node) {
    while (node.right) {
      node = node.right;
    }

    return node;
  }

  deleteMax() {
    let max;
    this.root = this._deleteMax(this.root, (node) => max = node);
    return max;
  }

  _deleteMax(node, cb = () => {}) {
    if (!node) {
      cb(node);
      return null;
    }

    if (!node.right) {
      this.size--;
      cb(node);
      return node.left;
    }

    node.right = this._deleteMax(node.right, cb);
    // return node;
    return this.keepBalance(node);
  }

  find(key) {
    const node = this.get(this.root, key);
    return node;
  }

  _delete(node, key) {
    if (!node) {
      return null;
    }

    if (node.key > key) {
      node.left = this._delete(node.left, key);
    } else if (node.key < key) {
      node.right = this._delete(node.right, key);
    } else {
      if (!node.left) {
        this.size--;
        node = node.right;
      } else if (!node.right) {
        this.size--;
        node = node.left;
      } else {
        let successor;
        node.left = this._deleteMax(node.left, (node) => {
          successor = node;
        });

        successor.left = node.left;
        successor.right = node.right;

        node = successor;
      }
    }

    return this.keepBalance(node);
  }

  delete(key) {
    this.root = this._delete(this.root, key);
  }

  _preOrder(node, cb = () => {}) {
    if (!node) return;
    cb(node);
    this._preOrder(node.left, cb);
    this._preOrder(node.right, cb);
  }

  preOrder(cb = () => {}) {
    this._preOrder(this.root, cb);
  }
}

const bst = new BST();

bst.push(4, 4);
bst.push(3, 3);
bst.push(2, 2);
bst.push(1, 1);

const result = [];

// bst.delete(2);
const print = (result = []) => (node) => {
  result.push(`key: ${node.key} value: ${node.value}`);
}
bst.preOrder(print(result));
console.log(result.join(' => '));

bst.deleteMax();
result.length = 0;
bst.preOrder(print(result));
console.log(result.join(' => '));
