class LinkedList {
  constructor() {
    this.list;
    this.headNode = null;
    this.id = 0;
  }
  appendValue(value) {
    const node = new Node(value, null);
    let currentNode = this.headNode;
    if (currentNode) {
      while (currentNode) {
        const pointer = currentNode.nextNode;
        if (pointer === null) {
          currentNode.nextNode = node;
          this.list = {
            ...this.list,
            [this.id]: node,
          };
          this.id++;
          return;
        } else {
          currentNode = pointer;
        }
      }
    } else {
      this.headNode = node;
      this.list = {
        [this.id]: node,
      };
      this.id++;
    }
  }
  prependValue(value) {
    const node = new Node(value, this.headNode);
    this.headNode = node;
    this.list = {
      ...this.list,
      [this.id]: node,
    };
    this.id++;
  }
  size() {
    let size = 0;
    let currentNode = this.headNode;
    while (currentNode) {
      size++;
      currentNode = currentNode.nextNode;
    }
    return size;
  }
  head() {
    return this.headNode;
  }
  tail() {
    let currentNode = this.headNode;
    while (currentNode) {
      const pointer = currentNode.nextNode;
      if (pointer === null) {
        return currentNode;
      }
      currentNode = pointer;
    }
  }
  at(index) {
    // returns the node at the given index
    let i = 0;
    let currentNode = this.headNode;
    while (i < index) {
      currentNode = currentNode.nextNode;
      i++;
    }
    return currentNode;
  }
  pop() {
    let currentNode = this.headNode;
    while (currentNode) {
      let pointer = currentNode.nextNode;
      if (pointer.nextNode === null) {
        // delete last object from list
        for (const prop in this.list) {
          if (this.list[prop].value === pointer.value) {
            delete this.list[prop];
          }
        }
        // delete pointer on second to last object
        currentNode.nextNode = null;
        return;
      }
      currentNode = pointer;
    }
  }
  contains(value) {
    let currentNode = this.headNode;
    const tail = this.tail();
    while (true) {
      if (currentNode.value === value) {
        return true;
      }
      if (currentNode == tail) {
        return false;
      }
      currentNode = currentNode.nextNode;
    }
  }
  find(value) {
    let currentNode = this.headNode;
    const tail = this.tail();
    let i = 0;
    while (true) {
      if (currentNode.value === value) {
        return i;
      }
      if (currentNode == tail) {
        return null;
      }
      currentNode = currentNode.nextNode;
      i++;
    }
  }
  toString() {
    // The format should be: ( value ) -> ( value ) -> ( value ) -> null
    let str = '';
    let currentNode = this.headNode;
    const tail = this.tail();
    while (true) {
      let value = currentNode.value;
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      if (currentNode == tail) {
        str += `( ${value} ) -> ${null}`;
        return str;
      }
      str += `( ${value} ) -> `;
      currentNode = currentNode.nextNode;
    }
  }
}

class Node {
  //contains value function and a link to the nextNode, both set as null by default
  constructor(value, nextNode) {
    this.value = value ?? null;
    this.nextNode = nextNode ?? null;
  }
}

const myList = new LinkedList();

myList.appendValue({ x: 'y', a: 'b' });
myList.appendValue(['hank', 'bobby', 'peggy']);
myList.appendValue(69);
myList.appendValue(420);
myList.prependValue('hot dog');
myList.prependValue('baby yoda');
myList.pop()
console.log(myList);
// LinkedList {
//   headNode: Node {
//     value: 'baby yoda',
//     nextNode: Node { value: 'hot dog', nextNode: [Node] }
//   },
//   id: 6,
//   list: {
//     '0': Node { value: [Object], nextNode: [Node] },
//     '1': Node { value: [Array], nextNode: [Node] },
//     '2': Node { value: 69, nextNode: null },
//     '4': Node { value: 'hot dog', nextNode: [Node] },
//     '5': Node { value: 'baby yoda', nextNode: [Node] }
//   }
// }