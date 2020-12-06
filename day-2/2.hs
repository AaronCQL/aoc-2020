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

xor :: Bool -> Bool -> Bool
xor b1 b2 = b1 /= b2

-- returns true if the given line is a valid password
isValidLine :: String -> Bool
isValidLine ln =
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