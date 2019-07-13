import java.util.Arrays;
import java.lang.Math;

class hash {

  public static void main(String[] args) {
    hash a = new hash();
    a.hashSHA("A");
  }

  final int b = 1600, w = 64, l = 6, nr = 12 + 2 * l;

  final int outputLength = 224; // oder : 256 / 384 / 512

  // Diese Funktion nimmt einen String entgegen und gibt dessen Hash-Value zurück
  String hashSHA(String message) {
    // Kreierung des Arrays inputBits, die message als Bits mit dem für den SHA3-Algorithmus charakteristischen Suffix [0, 1]
    boolean[] messageBits = stringToBitArray(message);
    boolean[] inputBits = new boolean[messageBits.length + 2];
    System.arraycopy(messageBits, 0, inputBits, 0, messageBits.length);
    System.arraycopy(new boolean[] {false, true}, 0, inputBits, messageBits.length, 2);
    // Der momentane State
    boolean[][][] A = new boolean[5][5][w];
    // Der Array inputBits wird in (b - 2 * outputLength) grosse Chunks geteilt und zum Array Chunks appendet
    boolean[][] chunks = new boolean[inputBits.length / (b - 2 * outputLength) + 1][b - 2 * outputLength];
    for (int i = 0; i < inputBits.length / (b - 2 * outputLength) + 1; i++) {
      // Der i-te Teil des Arrays inputBits mit länge (b - 2 * outputLength) wird in chunks[i] kopiert
      int copyLength = (inputBits.length - i * (b - 2 * outputLength)) % (b - 2 * outputLength);
      System.arraycopy(inputBits, i * (b - 2 * outputLength), chunks[i], 0, copyLength);
    }
    return "";
  }

  // Diese Funktion gibt einen Little-Endian-Hex-String des States A zurück
  String stateToLittleEndianHexString(boolean[][][] A) {
    return "0";
  }

  // Diese Funktion konvertiert einen State zu einem Binary-String
  String stateToBinString(boolean[][][] A) {
    return "0";
  }

  // Diese Funktion konvertiert die Bits einer Nachricht, mit maximaler Länge (b - 2 * outputLength), zu einem State
  boolean[][][] messageBitsToState(boolean[] bitArray) {
    return new boolean[][][] {{{true}}};
  }

  // Diese Funktion konvertiert einen String zu einem Binary-Array
  boolean[] stringToBitArray(String str) {
    return new boolean[] {true};
  }

  // Diese Funktion gibt den Array zurück, nachdem die pad10*1 Funktion darauf angewendet wurde
  boolean[] bitPadding(boolean[] arr) {
    return new boolean[] {true};
  }

  // Gibt den State zurück, nachdem das five step mapping darauf angewendet wurde
  boolean[][][] keccakRound(boolean[][][] A, int i) {
    return iota(chi(pi(rho(theta(A)))), i);
  }

  // Die erste Funktion des five step mappings
  boolean[][][] theta(boolean[][][] A) {
    boolean[][] C = new boolean[5][w];
    for (int x = 0; x < 5; x++) {
      for (int z = 0; z < w; z++) {
        // Der momentane Bit, welcher bei C[x][z] eingefügt wird
        boolean currBit = false;
        for (int i = 0; i < 5; i++) currBit ^= A[x][i][z];
        C[x][z] = currBit;
      }
    }
    boolean[][] D = new boolean[5][w];
    for (int x = 0; x < 5; x++) {
      for (int z = 0; z < w; z++) {
        D[x][z] = C[(((x - 1) % 5) + 5) % 5][z] ^ C[(x + 1) % 5][(z - 1) % w];
      }
    }
    boolean[][][] aA = new boolean[5][5][w];
    for (int x = 0; x < 5; x++) {
      for (int y = 0; y < 5; y++) {
        for (int z = 0; z < w; z++) aA[x][y][z] = A[x][y][z] ^ D[x][z];
      }
    }
    return aA;
  }

  // Die zweite Funktion des five step mappings
  boolean[][][] rho(boolean[][][] A) {
    boolean[][][] aA = new boolean[5][5][w];
    int x = 1, y = 0, xTemp;
    for (int t = 0; t < 24; t++) {
      for (int z = 0; z < w; z++) aA[x][y][(z + (t + 1) * (t + 2) / 2) % w] = A[x][y][z];
      xTemp = x;
  		x = y;
  		y = (2 * xTemp + 3 * y) % 5;
    }
    return aA;
  }

  // Die dritte Funktion des five step mappings
  boolean[][][] pi(boolean[][][] A) {
    boolean[][][] aA = new boolean[5][5][w];
    for (int x = 0; x < 5; x++) {
      for (int y = 0; y < 5; y++) {
        for (int z = 0; z < w; z++) aA[x][y][z] = A[(x + 3 * y) % 5][x][z];
      }
    }
    return aA;
  }

  // Die vierte Funktion des five step mappings
  boolean[][][] chi(boolean[][][] A) {
    boolean[][][] aA = new boolean[5][5][w];
    for (int x = 0; x < 5; x++) {
      for (int y = 0; y < 5; y++) {
        for (int z = 0; z < w; z++) aA[x][y][z] ^= (A[(x + 1) % 5][y][z] ^ true) & A[(x + 2) % 5][y][z];
      }
    }
    return aA;
  }

  // Die fünfte Funktion des five step mappings
  boolean[][][] iota(boolean[][][] A, int i) {
    // Automatisch ausgefüllt mit false (Bits von Wert 0)
    boolean[] RC = new boolean[w];
    for (int j = 0; j < l + 1; j++) RC[(int)Math.pow(2, j) - 1] = roundConstant(j + 7 * i);
    for (int z = 0; z < w; z++) A[0][0][z] ^= RC[z];
    return A;
  }

  // Diese Funktion gibt eine Konstante zurück, welche von der Rundennummer abhängt. Wird von der Funktion iota gerufen
  boolean roundConstant(int t) {
    if (t % 255 == 0) return true;
    // R verkörpert ein Byte mit Startwert 10000000
    boolean[] R = {true, false, false, false, false, false, false, false};
    for (int i = 0; i < t % 255; t++) {
      // Shifte jeden Wert von R um eins nach rechts
      for (int j = 7; j >= 0; j--) R[j + 1] = R[j];
      R[0] ^= R[8];
      R[4] ^= R[8];
      R[5] ^= R[8];
      R[6] ^= R[8];
    }
    return R[0];
  }

}
