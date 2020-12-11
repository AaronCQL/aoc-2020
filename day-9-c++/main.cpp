#include <algorithm>
#include <fstream>
#include <iostream>
#include <unordered_set>
#include <vector>

std::vector<int> read_input() {
    std::ifstream file("input.txt");
    std::vector<int> input;

    int x;
    while (file >> x) {
        input.push_back(x);
    }

    return input;
}

int part_1(std::vector<int> input) {
    const std::size_t PREAMBLE_LENGTH = 25;

    std::unordered_set<int> set(input.begin(), input.begin() + PREAMBLE_LENGTH);

    for (std::size_t i = 0; i < input.size() - PREAMBLE_LENGTH; i++) {
        int target = input[i + PREAMBLE_LENGTH];

        bool has_property = false;
        for (int s : set) {
            int diff = target - s;
            if (set.count(diff)) {
                has_property = true;
                break;
            }
        }

        set.erase(input[i]);
        set.insert(target);

        if (!has_property) {
            return target;
        }
    }

    return -1;  // shouldn't be reachable for a valid input
}

int part_2(std::vector<int> input) {
    const int target = part_1(input);
    std::size_t i = 0;
    std::size_t j = 1;
    int sum = input[i] + input[j];

    while (sum != target) {
        if (sum < target) {
            // expand window rightwards if sum < target
            sum += input[++j];
            continue;
        }

        // cases when sum > target:
        if (j - i == 1) {
            // ensure min 2 numbers in the subarray
            sum += -input[i++] + input[++j];
            continue;
        }

        // otherwise, shrink window leftwards
        sum -= input[i++];
    }

    int min = *min_element(input.begin() + i, input.begin() + j + 1);
    int max = *max_element(input.begin() + i, input.begin() + j + 1);

    return min + max;
}

int main() {
    std::vector<int> input = read_input();

    std::cout << part_1(input) << "\n";
    std::cout << part_2(input) << "\n";

    return 0;
}