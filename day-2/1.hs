import Data.List.Split (splitOn)

main :: IO ()
main = do
  inputFile <- readFile "input.txt"
  let lns = lines inputFile
  let numValid =
        foldr
          (\ln acc -> if isValidLine ln then acc + 1 else acc)
          0
          lns
  print numValid

-- returns true if the given line is a valid password
isValidLine :: String -> Bool
isValidLine ln =
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