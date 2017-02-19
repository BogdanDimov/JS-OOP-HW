'use strict';

class listNode {
    constructor(value) {
        this._value = value;
        this._next = null;
        this._previous = null;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        this._value = newValue;
    }

    get next() {
        return this._next;
    }

    set next(nextNode) {
        this._next = nextNode;
    }

    get previous() {
        return this._previous;
    }

    set previous(prevNode) {
        this._previous = prevNode;
    }
}

class LinkedList {
    constructor() {
        this._head = null;
        this._last = null;
        this._length = 0;
    }

    // functions

    appendSingeValue(value) {

        let newNode = new listNode(value);

        if (this._head === null && this._last === null) {
            this._head = newNode;
            this._last = newNode;
        } else {
            this._last.next = newNode;
            newNode.previous = this._last;
            this._last = newNode;
        }

        this._length += 1;
    }

    append(...values) {
        for (let v of values) {
            this.appendSingeValue(v);
        }
        return this;
    }

    prependSingle(value) {
        let newNode = new listNode(value);

        if (this._head === null && this._last === null) {
            this._head = newNode;
            this._last = newNode;
        } else {
            this._head.previous = newNode;
            newNode.next = this._head;
            this._head = newNode;
        }

        this._length += 1;
    }

    prepend(...values) {
        for (let i = values.length - 1; i >= 0; i -= 1) {
            this.prependSingle(values[i]);
        }

        return this;
    }

    insert(index, ...values) {
        if (index < 0 || index >= this._length) {
            throw new Error("Index was outside the boundaries of the list");
        }

        let currentValues = this.toArray();
        currentValues.splice(index, 0, ...values);

        this._head = null;
        this._last = null;
        this._length = 0;
        this.append(...currentValues);
        return this;
    }

    removeAt(index) {
        let listValues = this.toArray();

        let removedValue = listValues.splice(index, 1);

        this._head = null;
        this._last = null;
        this._length = 0;

        this.append(...listValues);

        return removedValue;
    }

    at(index, value) {

        let listValues = this.toArray();

        if (value === undefined) {
            return listValues[index];
        } else {
            let currentIndex = 0;
            let currentNode = this._head;
            while (currentIndex < this._length && currentNode !== null) {
                if (currentIndex === index) {
                    currentNode.value = value;
                    break;
                }
                currentNode = currentNode.next;
                currentIndex += 1;
            }
        }
    }

    toString() {
        return this.toArray().join(" -> ");
    }

    toArray() {
        let result = [];

        let node = this._head;

        while (node !== null) {
            result.push(node.value);
            node = node.next;
        }

        return result;
    }

    // properties
    get first() {
        return this._head.value;
    }

    get last() {
        return this._last.value;
    }

    get length() {
        return this._length;
    }
}

LinkedList.prototype[Symbol.iterator] = function*() {
    let node = this._head;

    while (node !== null) {
        yield node.value;
        node = node.next;
    }
};


// let list = new LinkedList();
// list.append(1, 2, 3, 4, 5, 4, 23, 2, 1, 1, 2, 3, 32).prepend(159);
// for (let node of list) {
//     console.log(node);
// }

module.exports = LinkedList;