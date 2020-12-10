# Process input.txt to proper Prolog terms as processed-input.txt
# String manipulation in Prolog is too difficult =P

input = File.open("input.txt").read

def processed_line_to_prolog_clause(line)
    quantities = line
        .map { |word| word[/\d+/] }
        .filter { |word| word != nil } 
    bags = line
        .map { |word| word.gsub(/\d+/, "").strip().gsub(" ", "_") }
    if bags[1] == "no_other" then
        "contains(#{bags[0]}, [], [])."
    else
        "contains(#{bags[0]}, [#{bags.drop(1).join(", ")}], [#{quantities.join(", ")}])."
    end
end

processed_input = input
    .gsub(".", "") 
    .gsub(",", "")
    .gsub("bags", "")
    .gsub("bag", "")
    .gsub("contain", "")
    .split("\n")
    .map { |line| line.strip().split(/[ ]{2,}/) }
    .map { |line| processed_line_to_prolog_clause(line) }
    .join("\n") 

File.open("processed-input.txt", "w") { |f| f.write(processed_input) }