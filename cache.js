const { DoubleLinkedList, Node } = require('./doubleLinkList');

class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.count = 0;

    this.map = {};
    // key是频率 value是频率对应的双向链表
    this.freqMap = {};
  }
  
  // 更新节点的频率
  updateFreq(node) {
    let freq = node.freq;
    
    // 删除该节点所在的频率链表中
    node = this.freqMap[freq].delete(node);
    // 当前频率链表为空时 删除该链表
    if (!this.freqMap[freq].count) {
      delete this.freqMap[freq];
    }
    
    // 频率自增
    freq++;
    // 频率映射不存在 创建新的链表
    if (!this.freqMap[freq]) {
      this.freqMap[freq] = new DoubleLinkedList(this.capacity);
    }
    // 将节点信息插入频率列表尾部
    const newNode = this.freqMap[freq].push(node.key, node.value);
    // 添加频率
    newNode.freq = freq;
    // 返回新节点
    return newNode;
  }

  get(key) {
    const node = this.map[key];
    if (!node) return null;

    this.updateFreq(node);
    return node.value;
  }

  put(key, value) {
    if (!this.capacity) return null;

    const currNode = this.map[key];
    // 缓存命中
    if (currNode) {
      currNode.vaule = value; 
      const newNode = this.updateFreq(currNode);
      this.map[key] = newNode;
    } else {
      // 缓存未命中
      // 缓存已满
      if (this.capacity === this.count) {
        // 最低的频率
        const minFreq = Math.min.apply(null, Object.keys(this.freqMap));
        const oldNode = this.freqMap[minFreq].pop();
        // 删除在本地map中的数据
        delete this.map[oldNode.key];
        this.count--;
      }

      let initFreq = 1;
      if (!this.freqMap[initFreq]) {
        this.freqMap[initFreq] = new DoubleLinkedList(this.capacity);
      }
      const newNode = this.freqMap[initFreq].push(key, value);
      newNode.freq = initFreq;
      this.map[newNode.key] = newNode;
      this.count++;
    }


  }

  toString() {
    console.log('==================');
    Object.keys(this.freqMap).forEach((freq) => {
      console.log(`*********Freq ${freq}********`)
      this.freqMap[freq].toString();
    })
  }
}

class LRUCache {
  constructor(capacity = 0) {
    this.capacity = capacity;
    this.count = 0;

    this.map = {};
    this.list = new DoubleLinkedList(capacity);
  }

  get(key) {
    const node = this.map[key];
    if (!node) {
      return null;
    }
    // 删除链表中的节点
    // 将其放到链表的尾部
    this.list.delete(node);
    this.list.push(key, node.value);
    return node.value;
  }

  put(key, value) {
    if (!this.capacity) return null;

    const currNode = this.map[key];
    if (currNode) {
      this.list.delete(currNode);
      this.count--;
    } else {
      if (this.capacity === this.count) {
        const oldNode = this.list.shift();
        delete this.map[oldNode.key];
      }
    }

    const newNode = this.list.push(key, value);
    this.map[key] = newNode;
    this.count++;
  }

  toString() {
    this.list.toString();
  }
}



class FIFOCache {
  constructor(capacity = 0) {
    this.capacity = capacity;
    this.count = 0;

    this.map = {};
    this.list = new DoubleLinkedList(capacity);
  }


  // 获取key所在的value
  get(key) {
    // 不存在 返回-1
    if (!this.map[key]) {
      return null;
    }

    const node = this.map[key];
    return node.value;
  }

  put(key, value) {
    if (!this.capacity) {
      return null;
    }

    // 存在缓存map中
    if (this.map[key]) {
      // 把删除链表中旧的节点
      this.list.delete(this.map[key]);
      this.count--;
    } else {
      // 容量满了
      if (this.capacity === this.count) {
        // 从头部删除节点
        const oldNode = this.list.shift();
        delete this.map[oldNode.key];
        // 节点数目减一
        this.count--;
      }
    }

    // 插入新的节点到尾部
    const newNode = this.list.push(key, value);;
    // 更新map中的节点
    this.map[key] = newNode;
    // 节点数目加一
    this.count++;
  }

  toString() {
    this.list.toString();
  }
}

const fifoCache = new LFUCache(2);

fifoCache.put(1, { a: 1 });
fifoCache.toString();
fifoCache.put(2, { a: 2 });
fifoCache.toString();
fifoCache.put(1, { a: 4 });
fifoCache.toString();
fifoCache.put(3, { a: 3 });
fifoCache.toString();
console.log(fifoCache.get(4));
