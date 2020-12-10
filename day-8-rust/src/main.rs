use std::fs;

struct Instruction {
    operation: String,
    argument: i32,
}

impl Instruction {
    fn swap_nop_jmp(&mut self) {
        match self.operation.as_str() {
            "nop" => self.operation = String::from("jmp"),
            "jmp" => self.operation = String::from("nop"),
            _ => (),
        }
    }
}

fn get_instructions() -> Vec<Instruction> {
    fs::read_to_string("input.txt")
        .unwrap()
        .lines()
        .map(|line| {
            let pair: Vec<&str> = line.split(" ").collect();
            Instruction {
                operation: String::from(pair[0]),
                argument: pair[1].parse::<i32>().unwrap(),
            }
        })
        .collect()
}

// returns tuple of (program completion status, accumulator value)
fn run(instructions: &Vec<Instruction>) -> (bool, i32) {
    let len = instructions.len();
    let mut visited = vec![false; len];
    let mut idx: usize = 0;
    let mut acc: i32 = 0;

    while idx < len {
        match visited[idx] {
            true => return (false, acc),
            false => visited[idx] = true,
        }

        let Instruction {
            operation,
            argument,
        } = &instructions[idx];
        match operation.as_str() {
            "acc" => {
                acc += argument;
                idx += 1
            }
            "jmp" => idx = (idx as i32 + argument) as usize,
            "nop" => idx += 1,
            _ => (),
        }
    }
    (true, acc)
}

fn part_1() {
    let instructions = get_instructions();

    let (_, acc) = run(&instructions);
    println!("Part 1: {}", acc);
}

fn part_2() {
    let mut instructions = get_instructions();

    // brute force: swap every nop/jmp instructions and test
    for i in 0..instructions.len() {
        if instructions[i].operation == "acc" {
            continue;
        }

        &instructions[i].swap_nop_jmp();
        let (is_complete, acc) = run(&instructions);
        if is_complete {
            return println!("Part 2: {}", acc);
        }
        &instructions[i].swap_nop_jmp();
    }
}

fn main() {
    part_1();
    part_2();
}
