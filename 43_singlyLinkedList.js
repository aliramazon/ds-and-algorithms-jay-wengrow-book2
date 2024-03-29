class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    #newNode(value) {
        return new Node(value);
    }

    push(value) {
        let newNode = this.#newNode(value);
        if (this.length === 0) {
            this.head = this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        return ++this.length;
    }

    pop() {
        let popped = this.tail;
        if (!popped) return undefined;

        if (this.length === 1) {
            this.head = this.tail = null;
        } else {
            let current = this.head;
            while (current.next.next) {
                current = current.next;
            }
            current.next = null;
            this.tail = current;
        }
        this.length--;

        return popped;
    }

    shift() {
        if (this.length === 0) return undefined;

        let shifted = this.head;
        if (this.length === 1) {
            this.head = this.tail = null;
        } else {
            this.head = this.head.next;
        }
        this.length--;
        return shifted;
    }

    unshift(value) {
        let newNode = this.#newNode(value);

        if (this.length === 0) {
            this.head = this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }
        return ++this.length;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            return undefined;
        } else {
            let currentNode = this.head;
            let currentIndex = 0;

            while (currentIndex < index) {
                currentNode = currentNode.next;
                currentIndex++;
            }
            return currentNode.value;
        }
    }

    set(index, newValue) {
        if (index < 0 || index >= this.length) return false;

        let current = this.head;
        let currentIdx = 0;
        while (currentIdx <= index) {
            if (currentIdx === index) {
                current.value = newValue;
                return true;
            }
            current = current.next;
            currentIdx++;
        }
    }

    insert(index, value) {
        if (index < 0 || index > this.length) return;

        let newNode = this.#newNode(value);

        if (this.length === 0) {
            this.head = this.tail = newNode;
        } else if (index === 0) {
            newNode.next = this.head;
            this.head = newNode;
        } else if (index === this.length) {
            this.tail.next = newNode;
            this.tail = newNode;
        } else {
            let prevNode = this.head;

            for (let i = 0; i < index - 1; i++) {
                prevNode = prevNode.next;
            }

            newNode.next = prevNode.next;
            prevNode.next = newNode;
        }
        return ++this.length;
    }

    removeAt(index) {
        if (index < 0 || index >= this.length) return;
        let removable;
        if (index === 0) {
            removable = this.head;
            if (this.length === 1) {
                this.head = this.tail = null;
            } else {
                this.head = this.head.next;
            }
        } else {
            let prevNode = this.head;
            for (let i = 0; i < index - 1; i++) {
                prevNode = prevNode.next;
            }
            removable = prevNode.next;

            if (index === this.length - 1) {
                prevNode.next = null;
                this.tail = prevNode;
            } else {
                prevNode.next = prevNode.next.next;
            }
        }
        this.length--;
        return removable;
    }
    remove(value) {
        let current = this.head;
        if (!current) return false;

        if (current.value === value) {
            this.shift();
            return true;
        } else {
            while (current.next && current.next.value !== value) {
                current = current.next;
            }
            if (!current.next) return false;
            current.next = current.next.next;
            if (!current.next) {
                this.tail = current;
            }
            this.length--;
        }
        return true;
    }

    reverse() {
        let current = this.head;
        let prev = null;
        let nextNode;

        while (current) {
            nextNode = current.next;
            current.next = prev;
            prev = current;
            current = nextNode;
        }
        [this.head, this.tail] = [this.tail, this.head];
        return this;
    }
}
