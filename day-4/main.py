import re

file = open("input.txt", "r")

input: str = file.read()

passports: list = input.split("\n\n")

# PART 1:
valid_passports_1: int = 0

for passport in passports:
    fields: list = passport.split()
    if len(fields) <= 6:
        continue
    if len(fields) == 8 or "cid" not in passport:
        valid_passports_1 += 1
print(valid_passports_1)

# PART 2:


def is_valid_byr(byr: str) -> bool:
    year: int = int(byr)
    return year >= 1920 and year <= 2002


def is_valid_iyr(iyr: str) -> bool:
    year: int = int(iyr)
    return year >= 2010 and year <= 2020


def is_valid_eyr(eyr: str) -> bool:
    year: int = int(eyr)
    return year >= 2020 and year <= 2030


def is_valid_hgt(hgt: str) -> bool:
    if hgt.endswith("cm"):
        height: int = int(hgt.replace("cm", ""))
        return height >= 150 and height <= 193
    elif hgt.endswith("in"):
        height: int = int(hgt.replace("in", ""))
        return height >= 59 and height <= 76


def is_valid_hcl(hcl: str) -> bool:
    regex = re.compile("^#[0-9a-f]{6}$")
    return regex.match(hcl) != None


def is_valid_ecl(ecl: str) -> bool:
    return ecl in ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]


def is_valid_pid(pid: str) -> bool:
    regex = re.compile("^[0-9]{9}$")
    return regex.match(pid) != None


def is_valid_passport(fields: str) -> bool:
    field_dict: dict = {}
    for field in fields:
        key, value = field.split(":")
        field_dict[key] = value

    return is_valid_byr(field_dict["byr"]) and is_valid_ecl(field_dict["ecl"]) \
        and is_valid_eyr(field_dict["eyr"]) and is_valid_hcl(field_dict["hcl"]) \
        and is_valid_hgt(field_dict["hgt"]) and is_valid_iyr(field_dict["iyr"]) \
        and is_valid_pid(field_dict["pid"])


valid_passports_2: int = 0

for passport in passports:
    fields: list = passport.split()
    if len(fields) <= 6:
        continue
    if len(fields) == 8 or "cid" not in passport:
        if is_valid_passport(fields):
            valid_passports_2 += 1
print(valid_passports_2)
