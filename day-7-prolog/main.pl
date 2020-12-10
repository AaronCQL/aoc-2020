:- dynamic contains/3.

% read Prolog terms from processed-input.txt:
read_input :-
    open("processed-input.txt", read, Stream),
    read_file(Stream, _),
    close(Stream).

read_file(Stream, []) :-
    at_end_of_stream(Stream), !.
read_file(Stream, [X|Xs]) :-
    read(Stream, X),
    assertz(X), % dynamically insert the term X into db
    read_file(Stream, Xs).

%% PART 1

contains_shiny_gold(Bag) :-
    contains_shiny_gold(Bag, _).

% recursively call contains_shiny_gold/1 for each bag
contains_shiny_gold_helper(_, []) :-
    false.
contains_shiny_gold_helper(Bag, [B|Bags]) :-
    contains_shiny_gold(B), !
    ;
    contains_shiny_gold_helper(Bag, Bags).

% base case, Bag contains nothing:
contains_shiny_gold(_, []) :- 
    false.
% trivial case, Bag itself contains shiny_gold:
contains_shiny_gold(Bag, Bags) :-
    contains(Bag, Bags, _),
    member(shiny_gold, Bags).
% inductive case:
contains_shiny_gold(Bag, Bags) :-
    contains(Bag, Bags, _),
    Bag \== shiny_gold,
    contains_shiny_gold_helper(Bag, Bags).

% part 1 answer:
part_1 :-
    abolish(contains/3), % clear dynamic terms from db
    read_input,
    aggregate_all(count, contains_shiny_gold(_), Count),
    writeln(Count).

%% PART 2

count_total_bags_helper([], [], _, 0) :- !.
count_total_bags_helper([B|Bags], [Q|Quantities], Multiplier, Count) :-
    count_total_bags_helper(Bags, Quantities, Multiplier, C1),
    NextMultiplier is Multiplier * Q,
    count_total_bags(B, NextMultiplier, C2),
    Count is Multiplier * Q + C1 + C2.

count_total_bags(Bag, Multiplier, Count) :-
    contains(Bag, Bags, Quantities),
    count_total_bags_helper(Bags, Quantities, Multiplier, Count).
    
part_2 :-
    abolish(contains/3), % clear dynamic terms from db
    read_input,
    count_total_bags(shiny_gold, 1, Count),
    writeln(Count).