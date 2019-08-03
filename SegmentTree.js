
class SegmentTree {
  constructor(list, merger = (a, b) => a + b) {
    const n = list.length;
    
    this.merger = merger;
    this.data = list.slice(0);
    this.tree = Array(4 * n);
    this.tree.fill(null);
    
    this.buildSegmentTree(0, 0, n - 1);
  }
  
  query(queryLeft, queryRight) {
    return this.getValue(0, 0, this.data.length - 1, queryLeft, queryRight);
  }
  
  getValue(treeIndex, left, right, queryLeft, queryRight) {
    if (left === queryLeft && right === queryRight) {
      return this.tree[treeIndex];
    }
    
    const mid = parseInt((right - left) / 2 + left, 10);
    const leftTreeIndex = this.leftChild(treeIndex);
    const rightTreeIndex = this.rightChild(treeIndex);
    
    if (queryRight <= mid) {
      return this.getValue(leftTreeIndex, left, mid, queryLeft, queryRight);
    } else if (queryLeft > mid) {
      return this.getValue(rightTreeIndex, mid + 1, right, queryLeft, queryRight);
    }
    
    const leftResult = this.getValue(leftTreeIndex, left, mid, queryLeft, mid);
    const rightResult = this.getValue(rightTreeIndex, mid + 1, right, mid + 1, queryRight);
    
    return this.merger(leftResult, rightResult);
  }
  
  buildSegmentTree(treeIndex, left, right) {
    if (left === right) {
      this.tree[treeIndex] = this.data[left];
      return;
    }
    
    const leftTreeIndex = this.leftChild(treeIndex);
    const rightTreeIndex = this.rightChild(treeIndex);
    const mid = parseInt((right - left) / 2 + left, 10);
    
    this.buildSegmentTree(leftTreeIndex, left, mid);
    this.buildSegmentTree(rightTreeIndex, mid + 1, right);

    this.tree[treeIndex] = this.merger(this.tree[leftTreeIndex], this.tree[rightTreeIndex]);
  }
  
  leftChild(index) {
    return 2 * index + 1;
  }
  
  rightChild(index) {
    return 2 * index + 2;
  }

  update(key, value) {
    if (key < 0 || key >= this.data.length) {
      throw new Error('SegmentTree update index参数无效');
    }
    this.data[key] = value;
    this.set(0, 0, this.data.length - 1, key, value);
  }
  
  set(treeIndex, left, right, key, value) { 
    if (left === right) {
      this.tree[treeIndex] = value;
      return;
    }
 
    const mid = parseInt((left + (right - left) / 2), 10);
    const leftTreeIndex = this.leftChild(treeIndex);
    const rightTreeIndex = this.rightChild(treeIndex);
   
    if (key <= mid) {
      this.set(leftTreeIndex, left, mid, key, value);
    } else {
      this.set(rightTreeIndex, mid + 1, right, key, value);
    }
    
    this.tree[treeIndex] = this.merger(this.tree[leftTreeIndex], this.tree[rightTreeIndex]);
  }

  _updateRegional(treeIndex, left, right, queryLeft, queryRight, value) {
    if (left === right) {
      this.tree[treeIndex] += value;
      return;
    }


    const mid = parseInt((left + (right - left) / 2), 10);
    const leftTreeIndex = this.leftChild(treeIndex);
    const rightTreeIndex = this.rightChild(treeIndex);

    if (queryRight <= mid) {
      this._updateRegional(leftTreeIndex, left, mid, queryLeft, mid, value);
    } else if (queryLeft > mid) {
      this._updateRegional(rightTreeIndex, mid + 1, right, mid + 1, queryRight, value);
    } else {
      this._updateRegional(leftTreeIndex, left, mid, queryLeft, mid, value);
      this._updateRegional(rightTreeIndex, mid + 1, right, mid + 1, queryRight, value);
    }

    this.tree[treeIndex] = this.merger(this.tree[leftTreeIndex], this.tree[rightTreeIndex]);
  }

  updateRegional(queryLeft, queryRight, value) {
    if (queryLeft < 0 || queryRight >= this.data.length || queryRight < queryLeft) {
      throw new Error('SegmentTree updateRegional 参数不合法');
    }

    for (let i = queryLeft; i <= queryRight; i++) {
      this.data[i] += value;
    }

    this._updateRegional(0, 0, this.data.length - 1, queryLeft, queryRight, value);
  }


  getMin(x, y) {
    return x > y ? y : x;
  }
}

 
// var obj = new SegmentTree([-2, 0, 3, -5, 2, -1]);
// var param_1 = obj.query(1,4);
// console.log(param_1);
// obj.updateRegional(1, 4, 1);
// var param_2 = obj.query(1,4);
// console.log(param_2);


class RMQ {
  constructor(list) {
    this.max = [];
    this.min = [];
    this.data = list.slice(0);

    this.init(0, 0, this.data.length - 1);
  }

  leftChild(index) {
    return index * 2 + 1;
  }

  rightChild(index) {
    return index * 2 + 2;
  }

  getMin(x, y) {
    return x > y ? y : x;
  }

  getMax(x, y) {
    return x > y ? x : y;
  }

  init(treeIndex, left, right) {
    if (left === right) {
      this.max[treeIndex] = this.data[left];
      this.min[treeIndex] = this.data[left];
      return;
    }

    const mid = parseInt((left + (right - left) / 2), 10);
    const leftTreeIndex = this.leftChild(treeIndex);
    const rightTreeIndex = this.rightChild(treeIndex);

    this.init(leftTreeIndex, left, mid);
    this.init(rightTreeIndex, mid + 1, right);

    this.max[treeIndex] = this.getMax(this.max[leftTreeIndex], this.max[rightTreeIndex]);
    this.min[treeIndex] = this.getMin(this.min[leftTreeIndex], this.min[rightTreeIndex]);
  }

  queryMax(treeIndex, left, right, queryLeft, queryRight) {
    if (queryLeft <= left && queryRight >= right) {
      return this.max[treeIndex];
    }

    if (left === right) {
      return this.max[treeIndex];
    }

    const mid = parseInt((left + (right - left) / 2), 10);
    const leftTreeIndex = this.leftChild(treeIndex);
    const rightTreeIndex = this.rightChild(treeIndex);

    if (queryRight <= mid) {
      return this.queryMax(leftTreeIndex, left, mid, queryLeft, queryRight);
    } else if (queryLeft > mid) {
      return this.queryMax(rightTreeIndex, mid + 1, right, queryLeft, queryRight);
    } else {
      const leftMax = this.queryMax(leftTreeIndex, left, mid, queryLeft, mid);
      const rightMax = this.queryMax(rightTreeIndex, mid + 1, right, mid + 1, queryRight);

      return this.getMax(leftMax, rightMax);
    }
  }

  queryMin(treeIndex, left, right, queryLeft, queryRight) {
    if (queryLeft <= left && queryRight >= right) {
      return this.min[treeIndex];
    }

    if (left === right) {
      return this.min[treeIndex];
    }

    const mid = parseInt((left + (right - left) / 2), 10);
    const leftTreeIndex = this.leftChild(treeIndex);
    const rightTreeIndex = this.rightChild(treeIndex);

    if (queryRight <= mid) {
      return this.queryMin(leftTreeIndex, left, mid, queryLeft, queryRight);
    } else if (queryLeft > mid) {
      return this.queryMin(rightTreeIndex, mid + 1, right, queryLeft, queryRight);
    } else {
      const leftMax = this.queryMin(leftTreeIndex, left, mid, queryLeft, mid);
      const rightMax = this.queryMin(rightTreeIndex, mid + 1, right, mid + 1, queryRight);

      return this.getMin(leftMax, rightMax);
    }
  }


  query(queryLeft, queryRight, isMax = true) {
    if (queryLeft < 0 || queryLeft > queryRight || queryRight > this.data.length - 1) {
      throw new Error('RMQ query 参数不合法');
    }

    return isMax 
      ? this.queryMax(0, 0, this.data.length - 1, queryLeft, queryRight)
      : this.queryMin(0, 0, this.data.length - 1, queryLeft, queryRight);
  }


}

const rmq = new RMQ([1, 2, 3, 4, 5]);
const max = rmq.query(0, 1);
const min = rmq.query(0, 1, false);
console.log(max, min);
