
  function Node(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
  }

  class BST {
    constructor() {
      this.root = null;
      this.count = 0;
    }

    add(key, value, fn = () => {}) {
      this.root = this.insertNoneRecursive(this.root, key, value, fn);
    }

    find(key, fn = () => {}) {
      return this._findNonRecursive(this.root, key, fn);
    }

    preOrder(fn = () => {}) {
      this._preOrder(this.root, fn);
    }

    inOrder(fn = () => {}) {
      this._inOrder(this.root, fn);
    }
    
    postOrder(fn = () => {}) {
      this._postOrder(this.root, fn);
    }

    levelOrder(fn = () => {}) {
      const list = [];
      let node = null;
      list.push(this.root);
      while (list.length) {
        node = list.shift();
        fn(node);

        if (node.left) list.push(node.left);
        if (node.right) list.push(node.right);
      }
    }

    removeMin(fn = () => {}) {
      if (!this.count) {
        console.log('当前树没有节点');
        fn(null);
        return;
      }
      this.root = this._removeMin(this.root, fn);
    }

    removeMax(fn = () => {}) {
      if (!this.count) {
        console.log('当前树没有节点');
        fn(null);
        return;
      }

      this.root = this._removeMax(this.root, fn);
    }

    delete(key, fn = () => {}) {
      this.root = this._delete(this.root, key, fn);
    }

    _delete(node, key, callback = () => {}) {
      if (!node) return null;

      if (key < node.key) {
        node.left = this._delete(node.left, key);
        return node;
      } else if (key > node.key) {
        node.right = this._delete(node.right, key);
        return node;
      } else {
        callback(node);

        if (!node.left) {
          return node.right;
        }

        if (!node.right) {
          return node.left;
        }

        let successor;
        node.right = this._removeMin(node.right, (minNode) => {
          successor = minNode;
        });

        successor.left = node.left;
        successor.right = node.right;

        return successor;
      }
    }

    _removeMax(node, callback = () => {}) {
      if (!node.right) {
        this.count--;
        callback(node);
        return node.left;
      }

      node.right = this._removeMax(node.right, callback);
      return node;
    }

    _removeMin(node, callback = () => {}) {
      if (!node.left) {
        this.count--;
        callback(node);
        return node.right;
      }

      node.left = this._removeMin(node.left, callback);
      return node;
    }

    _postOrder(node, callback = () => {}) {
      if (!node) return null;
      this._postOrder(node.left, callback);
      this._postOrder(node.right, callback);
      callback(node);
    }

    _inOrder(node, callback = () => {}) {
      if (!node) return null;
      this._inOrder(node.left, callback);
      callback(node);
      this._inOrder(node.right, callback);
    }

    _preOrder(node, callback = () => {}) {
      if (!node) return null;
      callback(node);
      this._preOrder(node.left, callback);
      this._preOrder(node.right, callback);
    }

    _find(node, key) {
      if (!node) return null;
      
      if (key === node.key) return node;
      
      if (key > node.key) return this._find(node.right, key);

      return this._find(node.left, key);
    }

    _findNonRecursive(node, key) {
      while (node) {
        if (key === node.key) return node;
        if (key > node.key) {
          node = node.right;
        } else {
          node = node.left;
        }
      }

      if (!node) return null;
    }

    insertRecursive(node, key, value, callback = () => {}) {
      if (!node) {
        this.count++;
        const newNode = new Node(key, value);
        callback(newNode, this);
        return newNode;;
      }

      if (key === node.key) {
        node.value = value;
        callback(node, this);
      } else if (key < node.key) {
        node.left = this.insertRecursive(node.left, key, value, callback);
      } else {
        node.right = this.insertRecursive(node.right, key, value, callback);
      }
      return node;
    }

    insertNoneRecursive(node, key, value, callback = () => {}) {
      if (!node) {
        this.count++;
        return new Node(key, value);
      }

      while (node) {
        if (key === node.key) {
          node.value = value;
          break;
        }
        if (key < node.key) {
          if (!node.left) {
            this.count++;
            node.left = new Node(key, value);
            break;
          }
          node = node.left;
        }
        else {
          if (!node.right) {
            this.count++;
            node.right = new Node(key, value);
            break;
          }
          node = node.right;
        }
      }

      return node;
    }

    size() {
      return this.count;
    }

    isEmpty() {
      return this.count === 0;
    }
  }

  const bst = new BST();

  bst.add(2, 4);
  bst.add(1, 1);
  bst.add(3, 9);

  bst.delete(2);

  console.log(bst);
