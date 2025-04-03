#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <queue>
#include <utility>

using namespace std;

vector<int> findOptimalDeals(
    const vector<pair<string, int>>& requests,
    const vector<pair<string, int>>& sellers) {
    
    // We created priority queue for equipment type
    unordered_map<string, priority_queue<int, vector<int>, greater<int>>> equipment_prices;
    
    // storing seller prices in Priority Queue
    for (const auto& seller : sellers) {
        equipment_prices[seller.first].push(seller.second);
    }
    
    // In this we are going to store the results
    vector<int> results;
    
    for (const auto& request : requests) {
        const string& equipment_type = request.first;
        int max_price = request.second;
        
        auto it = equipment_prices.find(equipment_type);
        if (it == equipment_prices.end() || it->second.empty()) {
            results.push_back(-1); // No sellers for that equipment
            continue;
        }
        
        // find lowest price of equipment
        int lowest_price = it->second.top();
        
        if (lowest_price <= max_price) {
            results.push_back(lowest_price);
            it->second.pop(); // it will Remove the used offer
        } else {
            results.push_back(-1); //if there are not any affordable offers
        }
    }
    
    return results;
}

int main() {

    vector<pair<string, int>> requests1 = {
        {"crane", 100000},       // here lowest price available - 90000
        {"JCB", 50000},           // No sellers therefore it should return None
        {"bulldozer", 70000},     // Should return lowest available - 68000
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

    
    vector<int> matches1 = findOptimalDeals(requests1, sellers1);
    
    cout << "[";
    for (size_t i = 0; i < matches1.size(); ++i) {
        if (matches1[i] == -1) {
            cout << "None";
        } else {
            cout << matches1[i];
        }
        
        if (i < matches1.size() - 1) {
            cout << ", ";
        }
    }
    cout << "]" << endl;
    
    
    return 0;
}