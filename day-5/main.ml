(* PART 1 *)
let input =
  let file = open_in "input.txt" in
  let str = really_input_string file (in_channel_length file) in
  close_in file;
  String.split_on_char '\n' str

let string_to_char_list str =
  let rec helper i xs =
    if i < 0 then 
      xs
    else 
      helper (i - 1) (str.[i] :: xs) in
  helper (String.length str - 1) []

let to_row_num row_code =
  let rec helper l h = function
    | [] -> l
    | x :: xs ->
        let diff = (h - l + 1) / 2 in
        if x == 'F' then
          helper l (h - diff) xs
        else
          helper (l + diff) h xs in
  helper 0 127 row_code

let to_col_num col_code =
  let rec helper l h = function
    | [] -> l
    | x :: xs ->
        let diff = (h - l + 1) / 2 in
        if x == 'L' then
          helper l (h - diff) xs
        else
          helper (l + diff) h xs in
  helper 0 7 col_code

let to_seat_id code =
  let row_code = String.sub code 0 7 in
  let col_code = String.sub code 7 3 in
  let row_num = to_row_num (string_to_char_list row_code) in
  let col_num = to_col_num (string_to_char_list col_code) in
  (row_num * 8) + col_num

let part_1 =
  let seat_ids = List.map to_seat_id input in
  List.fold_right max seat_ids 0

(* PART 2 *)
let find_seat_id (first :: rest) =
  let rec helper (x :: xs) (y :: ys) =
    if (y - x) == 1 then
      helper xs ys
    else
      x + 1 in
  helper (first :: rest) rest 

let part_2 =
  let seat_ids = List.map to_seat_id input in
  let sorted_ids = List.sort compare seat_ids in
  find_seat_id sorted_ids