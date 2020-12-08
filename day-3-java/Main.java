import java.io.*;
import java.util.*;

public class Main {
  public static void part1(ArrayList<String> grid) {
    int x = 0;
    int trees = 0;
    for (String line : grid) {
      int len = line.length();
      char current = line.charAt(x % len);
      if (current == '#') {
        trees++;
      }
      x += 3;
    }
    System.out.println(trees);
  }

  public static long part2helper(ArrayList<String> grid, int right, int down) {
    int x = 0;
    int trees = 0;
    for (int i = 0; i < grid.size(); i += down) {
      String line = grid.get(i);
      int len = line.length();
      char current = line.charAt(x % len);
      if (current == '#') {
        trees++;
      }
      x += right;
    }
    return trees;
  }

  public static void part2(ArrayList<String> grid) {
    long ans = part2helper(grid, 1, 1) * part2helper(grid, 3, 1) * part2helper(grid, 5, 1) * part2helper(grid, 7, 1)
        * part2helper(grid, 1, 2);
    System.out.println(ans);
  }

  public static void main(String[] args) throws FileNotFoundException {
    File inputFile = new File("input.txt");
    Scanner scanner = new Scanner(inputFile);

    ArrayList<String> grid = new ArrayList<>();
    while (scanner.hasNextLine()) {
      grid.add(scanner.nextLine());
    }
    scanner.close();

    part1(grid);
    part2(grid);
  }
}
