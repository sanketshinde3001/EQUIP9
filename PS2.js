class PriorityQueue {
    constructor() {
        this.data = [];
    }

    // insert operation
    insert(value) {
        this.data.push(value);
        this.heapifyUp();
    }

    // remove op
    removeMin() {
        if (this.isEmpty()) return null;
        const minValue = this.data[0];
        const lastValue = this.data.pop();
        if (this.data.length > 0) {
            this.data[0] = lastValue;
            this.heapifyDown();
        }
        return minValue;
    }

    // See if it is empty then return null or return top one
    peek() {
        return this.isEmpty() ? null : this.data[0];
    }

    // check if it is empthy or not
    isEmpty() {
        return this.data.length === 0;
    }

    heapifyUp() {
        let idx = this.data.length - 1;
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            if (this.data[parentIdx] <= this.data[idx]) break;
            [this.data[parentIdx], this.data[idx]] = [this.data[idx], this.data[parentIdx]];
            idx = parentIdx;
        }
    }

    heapifyDown() {
        let idx = 0;
        const length = this.data.length;
        while (true) {
            const leftIdx = 2 * idx + 1;
            const rightIdx = 2 * idx + 2;
            let smallest = idx;

            if (leftIdx < length && this.data[leftIdx] < this.data[smallest]) {
                smallest = leftIdx;
            }
            if (rightIdx < length && this.data[rightIdx] < this.data[smallest]) {
                smallest = rightIdx;
            }
            if (smallest === idx) break;
            [this.data[idx], this.data[smallest]] = [this.data[smallest], this.data[idx]];
            idx = smallest;
        }
    }
}

function matchBestDeals(buyerRequests, sellerListings) {
    const inventory = {};

    for (const [item, cost] of sellerListings) {
        if (!inventory[item]) {
            inventory[item] = new PriorityQueue();
        }
        inventory[item].insert(cost);
    }

    const finalMatches = [];

    for (const [item, budget] of buyerRequests) {
        const availableItems = inventory[item];

        if (!availableItems || availableItems.isEmpty()) {
            finalMatches.push(null); // if no sellers for this item
            continue;
        }

        const bestPrice = availableItems.peek();

        if (bestPrice <= budget) {
            finalMatches.push(availableItems.removeMin()); // Take the best-priced offer
        } else {
            finalMatches.push(null); // no deal found
        }
    }

    return finalMatches;
}

// Example cases
const buyerRequests = [
    ["crane", 100000],    // here lowest price available - 90000
    ["JCB", 50000],        // No sellers therefore it should return None
    ["bulldozer", 70000], // Should return lowest available - 68000
    ["excavator", 40000], // Price is too low so it will return None
    ["crane", 95000],      // As 90000 already used so next lowest is 95000
    ["crane", 85000]       // No more cheap cranes lest so return None
];

const sellerListings = [
    ["crane", 90000],
    ["bulldozer", 68000],
    ["excavator", 45000],
    ["crane", 95000],
    ["bulldozer", 72000],
    ["crane", 100000]
];

const bestDeals = matchBestDeals(buyerRequests, sellerListings);

console.log("[" + bestDeals.map(price => price ?? "None").join(", ") + "]");

