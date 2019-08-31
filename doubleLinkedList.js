class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;

    this.next = null;
    this.prev = null;
  }

  toString() {
    return `${this.key} : ${JSON.stringify(this.value)}`;
  }
}

class DoubleLinkedList {
  constructor(capacity) {
    this.head = null;
    this.tail = null;
    this.capacity = capacity;
    this.count = 0;
  }

  // 头部添加元素
  unshift(key, value) {
    const newNode = new Node(key, value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.head.prev = null;
      this.head.next = null;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
      this.head.prev = null;
    }
    this.count++;
    return newNode;
  }

  // 尾部添加节点
  push(key, value) {
    const newNode = new Node(key, value);
    if (!this.tail) {
      this.tail = newNode;
      this.head = newNode;
      this.tail.next = null;
      this.tail.prev = null;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
      this.tail.next = null;
    }

    this.count++;
    return newNode;
  }

  // 获得任意key所在的节点
  get(key) {
    let currNode = this.head;
    let returnNode = null;
    while (currNode) {
      if (currNode.key === key) {

        returnNode = currNode;
        break;
      }
      currNode = currNode.next;
    }

    return returnNode;
  }

  // 删除头节点
  shift() {
    if (!this.head) {
      return null;
    }

    const deleteNode = this.head;
    if (deleteNode.next) {
      deleteNode.next.prev = null;
      this.head = deleteNode.next;
    } else {
      this.head = this.tail = null;
    }

    this.count--;
    return deleteNode;
  }

  // 删除尾节点
  pop() {
    // 尾部为空 返回null
    if (!this.tail) {
      return null;
    }

    const deleteNode = this.tail;
    // 有上一个节点
    if (deleteNode.prev) {
      deleteNode.prev.next = null;
      this.tail = deleteNode.prev;
    } else {
      // 没有上一个节点
      this.tail = this.head = null;
    }
    
    this.count--;
    return deleteNode;
  }

  // 删除任意node节点
  delete(node) {
    // node不存在 则删除尾节点
    if (!node) {
      return this.deleteTail();
    }
    if (node === this.head) return this.shift();

    if (node === this.tail) return this.pop();

    node.next.prev = node.prev;
    node.prev.next = node.next;
    this.count--;
    return node;
  }

  // 打印
  toString() {
    let currNode = this.head;
    let result = '';
    while (currNode) {
      result += currNode.toString();
      currNode = currNode.next;
      if (currNode) {
        result += ' => ';
      }
    }
    console.log(result || 'Null');
    return result;
  }
}

module.exports = {
  Node,
  DoubleLinkedList,
}
