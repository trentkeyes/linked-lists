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
    // returns the last node in the list
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
  }
  pop() {
    // removes the last element in the list
  }
  contains(value) {
    // returns true if the passid value is in the list and otherwise returns false
  }
  find(value) {
    //  returns the index of the node containing value, or null if not found.
  }
  toString() {
    // represents your LinkedList objects as strings, so you can print them out and preview them in the console.
    // The format should be: ( value ) -> ( value ) -> ( value ) -> null
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

myList.appendValue('bob');
myList.appendValue(69);
myList.appendValue(420);
myList.prependValue('hot dog');
myList.prependValue('baby yoda');

console.log(myList.tail());
