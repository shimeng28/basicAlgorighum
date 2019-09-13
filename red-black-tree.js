const BLACK = true;
const RED = false;

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;

    this.color = RED;
    this.left = null;
    this.right = null;
  }
}


class RBT {
  constructor() {
    this.size = 0;
    this.root = null;
  }

  isRed(node) {
    if (!node) {
      return BLACK;
    }
    return node.color;
  }

  // 颜色反转
  flipColor(node) {
    node.color = RED;
    node.left.color = BLACK;
    node.right.color = BLACK;
  }

  // 左旋转
  leftRotate(node) {
    const rightNode = node.right;
    
    // 左旋转
    node.right = rightNode.left;
    rightNode.left = node;

    rightNode.color = node.color;
    node.color = RED;

    return rightNode;
  }

  // 右旋转
  rightRotate(node) {
    const leftNode = node.left;

    node.left = leftNode.right;
    leftNode.right = node;

    leftNode.color = node.color;
    node.color = RED;

    return leftNode;
  }

  _add(node, key, value) {
    if (!node) {
      return new Node(key, value);
    }

    if (key > node.key) {
      node.right = this._add(node.right, key, value);
    } else if (key < node.key) {
      node.left = this._add(node.left, key, value);
    } else {
      node.value = value;
    }

    // 左旋转
    if (this.isRed(node.right) && !this.isRed(node.left)) {
      node = this.leftRotate(node);
    }

    // 右旋转
    if (this.isRed(node.left) && this.isRed(node.left.left)) {
      node = this.rightRotate(node);
    }

    // 颜色反转
    if (this.isRed(node.left) && this.isRed(node.right)) {
      node = this.flipColor(node);
    }

    return node;
  }

  append(key, value) {
    this.root = this._add(this.root, key, value);
    this.root.color = BLACK; // 保持最终的根节点为黑色
  }

  _find(node, key) {
    if (!node) return null;
    let result;
    if (node.key > key) {
      result = this._find(node.left, key);
    } else if (node.key < key) {
      result = this._find(node.right, key);
    } else {
      result = node;
    }

    return result;
  }

  find(key) {
    const result = this._find(this.root, key);
    return result;
  }


  deleteMax(node, cb = () => {}) {
    if (!node) return null;

    if (!node.right) {
      cb(node);
      return node.left;
    }

    return this.deleteMax(node.right);
  }

  _delete(node, key, cb = () => {}) {
    if (!node) {
      return null;
    }

    if (node.key > key) {
      node.left = this._delete(node.left, key, cb);
      return node;
    } else if (node.key < key) {
      node.right = this._delete(node.right, key, cb);
      return node;
    } else {
      cb(node);
      if (!node.left) return node.right;

      if (!node.right) return node.left;

      let successor;
      node.left = this.deleteMax(node.left, (deletNode) => successor = deletNode);
      successor.left = node.left;
      successor.right = node.right;
      return successor;
    }

    
  }

  delete(key) {
    let removeNode;
    this.root = this._delete(this.root, key, (node) => removeNode = node);
    return removeNode;
  }
}

const rbt = new RBT();
rbt.append(1, 1);
rbt.append(2, 2);
rbt.append(3, 3);
rbt.delete(2);

