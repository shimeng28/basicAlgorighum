
  // 最大堆 存储最小的N个数
  // 最小堆 存储最大的N个数

  class MaxHeap {
    constructor(capacity) {
      this.capacity = capacity;
      this.data = [];
      this.count = 1;
    }

    shiftUp(i) {
      const item = this.data[i];
      let parentIndex = parseInt(i / 2);
      while (parentIndex >= 1 && this.data[parentIndex] < item) {
        this.data[i] = this.data[parentIndex];
        i = parentIndex;
        parentIndex = parseInt(i / 2);
      }
      this.data[i] = item;
    }

    shiftDown(i) {
      let childIndex = i * 2;
      const item = this.data[i];
      while (childIndex < this.count) {
        if (this.data[childIndex + 1] > this.data[childIndex]) {
          childIndex++;
        }

        if (this.data[childIndex] < item) break;

        this.data[i] = this.data[childIndex];
        i = childIndex;
        childIndex = childIndex * 2;
      }

      this.data[i] = item;
    }
    add(value) {
      if (this.count > this.capacity) {
        if (this.data[1] > value) {
          this.data[1] = value;
          this.shiftDown(1);
        }
      } else {
        this.data[this.count] = value;
        this.shiftUp(this.count);
        this.count++;
      }
      return this;
    }

    pop() {
      if (this.isEmpty()) return null;
      const result = this.data[1];
      this.data[1] = this.data.pop();
      this.count--;
      this.shiftDown(1);
      return result;
    }

    isEmpty() {
      return this.count === 1;
    }

    size() {
      return this.data.length - 1;
    }

    toString() {
      return this.data.slice(1).join(', ');
    }
  }

  const arr = [3, 2, 1, 4, 5, 6];

  const maxHeap = new MaxHeap(5);
  arr.reduce((a, b) => a.add(b), maxHeap);
  console.log(maxHeap.toString());

  const result = [];
  for (let i = 0; i < 5; i++) {
    result.push(maxHeap.pop());
  }
  console.log(result.toString());
