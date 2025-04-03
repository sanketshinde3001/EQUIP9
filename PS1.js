const readline = require('readline');

function findClosestProvider(providerCount, connections, inventory, startProvider, requiredEquipment) {
    const network = new Map();
    
    // initiate with empty nodes
    for (let i = 1; i <= providerCount; i++) {
        network.set(i, []);
    }

    // make connections  
    for (const [providerA, providerB] of connections) {
        network.get(providerA).push(providerB);
        network.get(providerB).push(providerA);
    }

    // Sorting ensures a consistent order for traversal
    for (const [key, neighbors] of network.entries()) {
        network.set(key, neighbors.sort((a, b) => a - b));
    }

    console.log("Graph is like - ",[...network.entries()]);

    // BFS is used to find shortest path
    const searchQueue = [[startProvider, [startProvider]]]; 
    const checkedProviders = new Set();
    checkedProviders.add(startProvider);

    while (searchQueue.length > 0) {
        const [currentProvider, pathHistory] = searchQueue.shift();

        console.log(`Provider- ${currentProvider}, Path-  ${pathHistory}`); 

        // Check if provider has equipment
        if (inventory[currentProvider] && inventory[currentProvider].includes(requiredEquipment)) {
            console.log(`Match Found at Provider ${currentProvider}! Path: ${pathHistory}`);
            return pathHistory; // Return first match
        }

        // Add neighbors to the queue if they haven't been checked yet
        for (const neighbor of network.get(currentProvider)) {
            if (!checkedProviders.has(neighbor)) {
                checkedProviders.add(neighbor);
                searchQueue.push([neighbor, [...pathHistory, neighbor]]);
            }
        }
    }

    console.log("No provider has the requested equipment.");
    return -1; // Return -1 if no provider has the equipment
}

const providerCount = 5;
const connections = [[1, 2], [2, 3], [3, 4], [4, 5]];
const inventory = {
    1: ["excavator"],
    2: [],
    3: ["bulldozer"],
    4: ["excavator"],
    5: ["crane"]
};
const startProvider = 2;
const requiredEquipment = "excavator";

const bestPath = findClosestProvider(providerCount, connections, inventory, startProvider, requiredEquipment);
console.log("Best Path - ", bestPath);
