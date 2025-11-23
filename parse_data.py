import json
import os

def parse_lunch_file(filename):
    restaurants = {}
    current_restaurant = None

    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        if line.endswith(':'):
            current_restaurant = line[:-1]
            restaurants[current_restaurant] = []
        elif line.startswith('-'):
            if current_restaurant:
                restaurants[current_restaurant].append(line[1:].strip())
    
    return restaurants

def main():
    data = parse_lunch_file('lunch.txt')
    
    # Write to data.js
    with open('data.js', 'w') as f:
        f.write(f"const lunchData = {json.dumps(data, indent=4)};\n")
        f.write("export default lunchData;")

if __name__ == "__main__":
    main()
