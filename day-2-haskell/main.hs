import Data.List.Split (splitOn)

part1 :: IO ()
part1 = do
  inputFile <- readFile "input.txt"
  let lns = lines inputFile
  let numValid =
        foldr
          (\ln acc -> if isValidLine1 ln then acc + 1 else acc)
          0
          lns
  print numValid

-- returns true if the given line is a valid password
isValidLine1 :: String -> Bool
isValidLine1 ln =
  let wrds = words ln
      bounds = splitOn "-" (head wrds)
      lower = read (head bounds) :: Int
      upper = read (bounds !! 1) :: Int
      charNeeded = head (wrds !! 1)
      password = wrds !! 2
      numChars =
        foldr
          (\c acc -> if c == charNeeded then acc + 1 else acc)
          0
          password
      isValid = numChars >= lower && numChars <= upper
   in isValid

-- PART 2 --

part2 :: IO ()
part2 = do
  inputFile <- readFile "input.txt"
  let lns = lines inputFile
  let numValid =
        foldr
          (\ln acc -> if isValidLine2 ln then acc + 1 else acc)
          0
          lns
  print numValid

xor :: Bool -> Bool -> Bool
xor b1 b2 = b1 /= b2

-- returns true if the given line is a valid password
isValidLine2 :: String -> Bool
isValidLine2 ln =
  let wrds = words ln
      positions = splitOn "-" (head wrds)
      p1 = (read (head positions) :: Int) - 1
      p2 = (read (positions !! 1) :: Int) - 1
      charNeeded = head (wrds !! 1)
      password = wrds !! 2
      isValid =
        xor
          (password !! p1 == charNeeded)
          (password !! p2 == charNeeded)
   in isValid