class BinaryIndexedTree {
    constructor(length) {
        this.length = length;
        this.treeArray = new Array(length + 1).fill(0);
    }

    updateTree(pos, val) {
        while (pos <= this.length) {
            this.treeArray[pos] += val;
            // console.log(pos,val,this.treeArray[pos]);
            pos += pos & -pos;
        }
    }

    getPrefixSum(pos) {
        let total = 0;
        while (pos > 0) {
            total += this.treeArray[pos];
            pos -= pos & -pos;
        }
        return total;
    }

    getRangeSum(start, end) {
        return this.getPrefixSum(end) - this.getPrefixSum(start - 1);
    }
}

function processMaintenanceData(logEntries, queryRanges) {
    // console.log("here1");

    if (!Array.isArray(logEntries) || logEntries.length === 0) {
        // console.error("err");
        return [];
    }

    for (const entry of logEntries) {
        if (!Array.isArray(entry) || entry.length !== 3) {
            // console.error("err1");
            return [];
        }
    }

    const uniqueDates = [...new Set(logEntries.map(entry => entry[1]))].sort();
    // console.log(uniqueDates);
    
    const dateMap = new Map(uniqueDates.map((date, idx) => [date, idx + 1]));
    const bitTree = new BinaryIndexedTree(uniqueDates.length);

    for (const [_, logDate, logCost] of logEntries) {
        const pos = dateMap.get(logDate);
        // console.log(logDate,pos,logCost);
        bitTree.updateTree(pos, logCost);
    }

    const results = [];
    for (let i = 0; i < queryRanges.length; i++) {
        const [startDate, endDate] = queryRanges[i];
        // console.log(i,startDate,endDate);

        if (!dateMap.has(startDate) || !dateMap.has(endDate)) {
            results.push(0);
            continue;
        }

        const startIdx = dateMap.get(startDate);
        const endIdx = dateMap.get(endDate);
        if (startIdx > endIdx) {
            results.push(0);
            continue;
        }

        const sumResult = bitTree.getRangeSum(startIdx, endIdx);
        results.push(sumResult);
    }

    return results;
}

const maintenanceLogs = [
    [101, "2024-01-01", 500],
    [102, "2024-01-10", 300],
    [101, "2024-01-15", 700]
];

const queryIntervals = [
    ["2024-01-01", "2024-01-10"],
    ["2024-01-01", "2024-01-15"]
];

console.log(processMaintenanceData(maintenanceLogs, queryIntervals));

// console.log(processMaintenanceData(maintenanceLogs, [["2024-02-01", "2024-02-10"]])); // 0 bcz date is not in logs
// console.log(processMaintenanceData(maintenanceLogs, [["2024-01-15", "2024-01-01"]])); // start date is after end date so 0
