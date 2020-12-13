import Data.List (group, sort)

readInput :: IO [Int]
readInput = do
  inputFile <- readFile "input.txt"
  let input = lines inputFile
      jolts = map (\x -> read x :: Int) input
  return jolts

-- returns list of adjacent differences in the sorted list
getSortedDifferences :: IO [Int]
getSortedDifferences = do
  input <- readInput
  let sorted = sort input
      first = 0 : sorted
      second = sorted ++ [last sorted + 3]
      zipped = zip first second
      diffs = map (\(x, y) -> y - x) zipped
  return diffs

part1 :: IO ()
part1 = do
  diffs <- getSortedDifferences
  let count =
        foldr
          ( \x (ones, threes) ->
              if x == 1
                then (ones + 1, threes)
                else (ones, threes + 1)
          )
          (0, 0)
          diffs
   in print (uncurry (*) count)

{-
Hacky way of solving part 2. From the list of adjacent differences:

- Each group of four 1s will give 7 solutions
- Each group of three 1s will give 4 solutions
- Each group of two 1s will give 2 solutions

Thus, find number of such groups and multiply them together
-}
part2 :: IO ()
part2 = do
  diffs <- getSortedDifferences
  let groups = group diffs
      filteredGroups = filter (\grp -> head grp == 1) groups
      lengthGroups = map length filteredGroups
      transformedList =
        map
          ( \x ->
              case x of
                4 -> 7
                3 -> 4
                _ -> x
          )
          lengthGroups
  print $ product transformedList
