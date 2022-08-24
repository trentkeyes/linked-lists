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
  insertAt(value, index) {
    if (index === 0) {
      this.prependValue(value);
      return;
    }
    let i = 0;
    let currentNode = this.headNode;
    while (i < index) {
      if (i === index - 1) {
        // add node with pointer to next node
        const node = new Node(value, currentNode.nextNode);
        this.list = {
          ...this.list,
          [this.id]: node,
        };
        this.id++;
        // change current node pointer to newly added node
        currentNode.nextNode = node;
        return;
      } else {
        currentNode = currentNode.nextNode;
        i++;
      }
    }
  }
  removeAt(index) {
    if (index === 0) {
      const pointer = this.headNode.nextNode;
      for (const prop in this.list) {
        if (this.list[prop] === this.headNode) {
          // make second node new head node
          this.headNode = pointer;
          // delete head node
          delete this.list[prop];
          return;
        }
      }
    }
    let i = 0;
    let currentNode = this.headNode;
    while (i < index) {
      let pointer = currentNode.nextNode;
      if (i === index - 1) {
        // assign previous pointer to next nodes pointer
        currentNode.nextNode = pointer.nextNode;
        // delete next node
        for (const prop in this.list) {
          if (this.list[prop] === pointer) {
            delete this.list[prop];
          }
        }
        return;
      }
      currentNode = pointer;
      i++;
    }
  }
}

class Node {
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
console.log(myList.toString());
// ( baby yoda ) -> ( hot dog ) -> ( {"x":"y","a":"b"} ) -> ( ["hank","bobby","peggy"] ) -> ( 69 ) -> ( 420 ) -> null
myList.insertAt('inserted', 3);
console.log(myList.toString());
// ( baby yoda ) -> ( hot dog ) -> ( {"x":"y","a":"b"} ) -> ( inserted ) -> ( ["hank","bobby","peggy"] ) -> ( 69 ) -> ( 420 ) -> null
myList.removeAt(0);
console.log(myList.toString());
// ( hot dog ) -> ( {"x":"y","a":"b"} ) -> ( inserted ) -> ( ["hank","bobby","peggy"] ) -> ( 69 ) -> ( 420 ) -> null
