# 2. Optimal Equipment Deal Matching (Heap/Priority Queue)

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