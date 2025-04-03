# 1. Equipment Rental Availability (Graph Algorithm – BFS/DFS)

### Inputs

```
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
```

### Output SS
![image](https://github.com/user-attachments/assets/4296f297-f93a-4bd8-805e-d9a5119d45b3)


# 2. Optimal Equipment Deal Matching (Heap/Priority Queue)

### Inputs
```
    vector<pair<string, int>> requests1 = {
        {"crane", 100000},       // here lowest price available - 90000
        {"JCB", 50000},           // No sellers therefore it should return None
        {"bulldozer", 70000},     // Should match 68000 (lowest available)
        {"excavator", 40000},     // Price is too low so it will return None
        {"crane", 95000},         // As 90000 already used so next lowest is 95000
        {"crane", 85000}          // No more cheap cranes lest so return None
    };
    
    vector<pair<string, int>> sellers1 = {
        {"crane", 90000},
        {"bulldozer", 68000},
        {"excavator", 45000},
        {"crane", 95000},
        {"bulldozer", 72000},
        {"crane", 100000}
    };
```

### Output SS
![image](https://github.com/user-attachments/assets/5816dcc9-a9f9-4f42-b014-dd1d99b4af53)
