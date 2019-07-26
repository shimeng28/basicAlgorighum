class UnionFind {
  // Union Find 是一个数组
  constructor(n) {
    this.count = n;
    this.id = [];

    for(let i = 0; i < n; i++) {
      this.id[i] = i;
    }
  }


  find(p) {
    if (p < 0 || p >= this.count) {
      throw new Error('超出Union Find当前范围');
    }
    return this.id[p];
  }

  union(p, q) {
    const pId = this.find(p);
    const qId = this.find(q);

    if (pId === qId) {
      return;
    }

    for (let i = 0; i < this.count; i++) {
      if (this.id[i] === pId) {
        this.id[i] = qId;
      }
    }
  }

  isConnected(p, q) {
    return this.find(q) === this.find(p);
  }
}

class UnionFind2 {
  // 使用数组构建一个指向父节点的树
  constructor(n) {
    this.count = n;
    this.parent = [];
    
    for(let i = 0; i < n; i++) {
      this.parent = [i];
    }
  }

  find(p) {
    if (p < 0 || p >= this.count) {
      throw new Error('超出Union Find当前范围')
    }

    while (this.parent[p] !== p) {
      p = this.parent[p];
    }

    return p;
  }

  isConnected(p, q) {
    return this.find(p) === this.find(q);
  }

  union(p, q) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);

    if (pRoot === qRoot) return;

    this.parent[pRoot] = qRoot;
  }
}

// Union Find2 会造成树的层数太高，利用size进行优化
class UnionFind3 {
  constructor(n) {
    this.count = n;
    this.size = [];
    this.parent = [];

    for(let i = 0; i < n; i++) {
      this.parent = [i];
      this.size = 1;
    }
  }

  find(p) {
    if (p < 0 || p >= this.count) {
      throw new Error('超出Union Find当前范围')
    }

    while (this.parent[p] !== p) {
      p = this.parent[p];
    }

    return p;
  }

  isConnected(p, q) {
    return this.find(p) === this.find(q);
  }

  union(p, q) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);

    if (pRoot === qRoot) return;

    if (this.size[pRoot] < this.size[qRoot]) {
      this.parent[pRoot] = qRoot;
      this.size[qRoot] += this.size[pRoot];
    } else {
      this.parent[qRoot] = pRoot;
      this.size[pRoot] += this.size[qRoot];
    }
  }
}

// 利用高度进行优化

class UnionFind4 {
  constructor(n) {
    this.count = n;
    this.rank = [];
    this.parent = [];

    for(let i = 0; i < n; i++) {
      this.parent[i] = i;
      this.rank[i] = 1;
    }
  }

  find(p) {
    if (p < 0 || p >= this.count) {
      throw new Error('超出Union Find当前范围');
    }

    while (this.parent[p] !== p) {
      p = this.parent[p];
    }

    return p;
  }

  union(p, q) {
    const qRoot = this.find(q);
    const pRoot = this.find(p);

    if (pRoot === qRoot) return;

    if (this.rank[pRoot] < this.rank[qRoot]) {
      this.parent[pRoot] = qRoot;
    } else if (this.rank[pRoot] > this.rank[qRoot]) {
      this.parent[qRoot] = pRoot;
    } else {
      this.parent[qRoot] = pRoot;
      this.rank[qRoot]++;
    }
  }
}

class UnionFind5 {
  constructor(n) {
    this.count = n;
    this.rank = [];
    this.parent = [];

    for(let i = 0; i < n; i++) {
      this.parent[i] = i;
      this.rank[i] = 1;
    }
  }

  find(p) {
    if (p < 0 || p >= this.count) {
      throw new Error('超出Union Find当前范围');
    }

    while (this.parent[p] !== p) {
      // 路径压缩
      this.parent[p] = this.parent[this.parent[p]];
      p = this.parent[p];
    }

    return p;
  }

  find2(p) {
    if (p < 0 || p >= this.count) {
      throw new Error('超出Union Find当前范围');
    }

    if (this.parent[p] !== p) {
      this.parent[p] = this.find(this.parent[p]);
    }

    return this.parent[p];
  }

  union(p, q) {
    const qRoot = this.find(q);
    const pRoot = this.find(p);

    if (pRoot === qRoot) return;

    if (this.rank[pRoot] < this.rank[qRoot]) {
      this.parent[pRoot] = qRoot;
    } else if (this.rank[pRoot] > this.rank[qRoot]) {
      this.parent[qRoot] = pRoot;
    } else {
      this.parent[qRoot] = pRoot;
      this.rank[qRoot]++;
    }
  }
}




