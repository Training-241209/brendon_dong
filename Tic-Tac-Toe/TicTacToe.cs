using System.Text.RegularExpressions;

namespace Tic_Tac_Toe;

public class TicTacToe
{
    public static int player = 1;
    public static char playerChar = 'O';
    public static char[][] board = [
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']];

    public static void TurnChange() {
        if (player == 1) {
            player = 2;
            playerChar = 'X';
        }
        else {
            player = 1;
            playerChar = 'O';
        }
    }
    public static Boolean WinChecker(int row, int col) {
        if (board[row][0] == board[row][1] && board[row][1] == board[row][2]) return true;
        else if (board[0][col] == board[1][col] && board[1][col] == board[2][col]) return true;
        else if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[1][1] != ' ') return true;
        else if (board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[1][1] != ' ') return true;
        else return false;
    }
    public static Boolean TieChecker() {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (board[i][j] == ' ') {
                    return false;
                }
            }
        }
        return true;
    }
    public static int[] InputToCoordinates(string? input) {
        if (string.IsNullOrEmpty(input)) {
            Console.WriteLine("Input cannot be empty!");
            return [];
        }
        if (!Regex.Match(input, "^[a-cA-C][1-3]").Success) {
            Console.WriteLine("Input must match 'L#' formatting and must be within the");
            Console.WriteLine("boundaries of the board. Ex: A1, B2, C3");
            return [];
        }

        return [RowToInt(input[0]), ColToInt(input[1])];
    }
    public static int RowToInt(char row) {
        switch (row) {
            case 'A':
            case 'a':
                return 0;
            case 'B':
            case 'b':
                return 1;
            case 'C':
            case 'c':
                return 2;
            default:
                return -1;
        }
    }
    public static int ColToInt(char col) {
        return col - '0' - 1;
    }
    public static void MarkBoard(int row, int col) {
        if (board[row][col] != ' ') {
            Console.WriteLine("This space is already marked!");
            TurnChange(); //silly logic
            return;
        }
        
        board[row][col] = playerChar;
    }
    public static void PrintInstructions() {
        Console.WriteLine("▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄");
        Console.WriteLine("▌   HOW TO PLAY:   ▐");
        Console.WriteLine("▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀");
        Thread.Sleep(1000);
        Console.WriteLine("\nThis is a two-player game of Tic-Tac-Toe.");
        Thread.Sleep(2500);
        Console.WriteLine("\nWhen it is your turn, input the letter and number of where you want");
        Console.WriteLine("to mark your space in 'L#' notation, where L represents your column");
        Console.WriteLine("and # represents your row.");
        Thread.Sleep(4000);
        Console.WriteLine("\nTurns alternate between Player 1 (O) and Player 2 (X) after each space");
        Console.WriteLine("is marked. The winner is whoever lines up 3 vertical, horizontal, or diagonal");
        Console.WriteLine("spaces in a row. If the board is filled before this happens, the game is a tie.");
        Thread.Sleep(4000);
    }
    public static void PrintBoard() {
        Console.WriteLine("            1   2   3  ");
        Console.WriteLine("          ▄▄▄▄▄▄▄▄▄▄▄▄▄");
        Console.WriteLine("        A ▌ {0} ║ {1} ║ {2} ▐", board[0][0], board[0][1], board[0][2]);
        Console.WriteLine("          ▌═══╬═══╬═══▐");
        Console.WriteLine("        B ▌ {0} ║ {1} ║ {2} ▐", board[1][0], board[1][1], board[1][2]);
        Console.WriteLine("          ▌═══╬═══╬═══▐");
        Console.WriteLine("        C ▌ {0} ║ {1} ║ {2} ▐", board[2][0], board[2][1], board[2][2]);
        Console.WriteLine("          ▀▀▀▀▀▀▀▀▀▀▀▀▀");
    }
    public static void PrintTurn() {
        Console.WriteLine("      ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄");
        Console.WriteLine($"         Player {player}'s Turn!");
        Console.WriteLine("      ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀");
    }
    public static void PrintWin() {
        Console.WriteLine("      ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄");
        Console.WriteLine($"       ***Player {player} Wins!***");
        Console.WriteLine("      ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀");
        PrintBoard();
    }

    public static void PrintTie() {
        Console.WriteLine("      ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄");
        Console.WriteLine("         Nobody Wins.....");
        Console.WriteLine("      ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀");
        PrintBoard();
    }
    public static void StartGame() {
        Boolean gameActive = true;
        while (gameActive) {
            try {
                PrintTurn();
                PrintBoard();

                Console.Write("Enter a 'L#' space: ");
                string? input = Console.ReadLine();

                int[] coordinates = InputToCoordinates(input);
                if (coordinates.Length == 0) {
                    continue;
                }

                MarkBoard(coordinates[0], coordinates[1]);
                Thread.Sleep(1000);
                Console.Write("\n\n\n\n\n");

                if (WinChecker(coordinates[0], coordinates[1])) {
                    gameActive = false;
                    PrintWin();
                    Thread.Sleep(5000);
                    return;
                }

                if (TieChecker()) {
                    PrintTie();
                    return;
                }
                
                TurnChange();
            }
            catch(Exception e) {
                Console.Write(e);
            }
        }
    }
    public static void Main(string[] args)
    {
        PrintInstructions();
        StartGame();
    }
}
