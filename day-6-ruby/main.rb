input = File.open("input.txt").read

# PART 1:
part_1 = puts input
    # split by \n\n for each group:
    .split("\n\n")
    # remove \n in each group:
    .map { |group| group.gsub("\n", "") }
    # make each group a list of chars:
    .map { |group| group.split("") }
    # remove duplicates:
    .map { |group| group|[] }
    # find length of each array:
    .map { |group| group.length() }
    # sum the lengths up:
    .reduce(:+)

# PART 2:
def num_all_yes(answers)
    # create a character frequency hashmap:
    char_freq = Hash.new(0)
    answers.each { |char| char_freq[char] += 1 }
    # total number of people (OR number of yes required):
    num_required = char_freq["\n"] + 1
    
    char_freq.reduce(0) { |sum, (char, freq)| 
        freq == num_required ? sum + 1 : sum }
end

part_2 = puts input
    # split by \n\n for each group:
    .split("\n\n")
    # make each group a list of chars:
    .map { |group| group.split("") }
    # find number of questions with all yes answers:
    .map { |answers| num_all_yes(answers) }
    .reduce(:+) 
