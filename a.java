import java.util.Scanner;
import java.lang.Math;

class a {

  public static void main(String[] args) {
    Scanner in = new Scanner(System.in);
    while (true) {
      System.out.println(md5(in.nextLine()));
    }
  }

  public static String md5(String message) {
    int[] constants = new int[64];
    for (int i = 1; i <= 64; i++) constants[i - 1] = (int)Math.round(Math.floor(Math.abs(Math.sin(i) * Math.pow(2, 32))));
    int[] bytes = new int[(message.length() / 57 + 1) * 64];
    for (int i = 0; i < message.length(); i++) bytes[i] = (int)message.charAt(i);
    bytes[message.length()] = 1 << 7;
    for (int i = message.length() + 1; i < bytes.length - 8; i++) bytes[i] = 0;
    int msgLen = message.length() * 8;
    for (int i = 0; i < 8; i++) {
      bytes[bytes.length - 8 + i] = msgLen & 0xFF;
      msgLen >>= 8;
    }
    int[] words = new int[(message.length() / 57 + 1) * 16];
    for (int i = bytes.length - 1; i > 0; i-= 4) {
      int word = 0;
      for (int j = 0; j < 4; j++) {
        word <<= 8;
        word |= bytes[i - j];
      }
      words[i / 4] = word;
    }
    int a0 = 0x67452301;
    int b0 = 0xEFCDAB89;
    int c0 = 0x98BADCFE;
    int d0 = 0x10325476;

    int a, b, c, d;
    for (int startingIndex = 0; startingIndex < words.length; startingIndex += 16) {
      a = a0; b = b0; c = c0; d = d0;
      for (int i = 0; i < 64; i++) {
        if (i < 16) {
          switch (i % 4) {
            case 0: a = (b + leftRotate(a + F(b, c, d) + words[startingIndex + i] + constants[i], 7)) % (int)Math.pow(2, 32); break;
            case 1: d = (a + leftRotate(d + F(a, b, c) + words[startingIndex + i] + constants[i], 12)) % (int)Math.pow(2, 32); break;
            case 2: c = (d + leftRotate(c + F(d, a, b) + words[startingIndex + i] + constants[i], 17)) % (int)Math.pow(2, 32); break;
            case 3: b = (c + leftRotate(b + F(c, d, a) + words[startingIndex + i] + constants[i], 22)) % (int)Math.pow(2, 32); break;
          }
        } else if (i < 32) {
          switch (i % 4) {
            case 0: a = (b + leftRotate(a + G(b, c, d) + words[startingIndex + (5 * i + 1) % 16] + constants[i], 5)) % (int)Math.pow(2, 32); break;
            case 1: d = (a + leftRotate(d + G(a, b, c) + words[startingIndex + (5 * i + 1) % 16] + constants[i], 9)) % (int)Math.pow(2, 32); break;
            case 2: c = (d + leftRotate(c + G(d, a, b) + words[startingIndex + (5 * i + 1) % 16] + constants[i], 14)) % (int)Math.pow(2, 32); break;
            case 3: b = (c + leftRotate(b + G(c, d, a) + words[startingIndex + (5 * i + 1) % 16] + constants[i], 20)) % (int)Math.pow(2, 32); break;
          }
        } else if (i < 48) {
          switch (i % 4) {
            case 0: a = (b + leftRotate(a + H(b, c, d) + words[startingIndex + (3 * i + 5) % 16] + constants[i], 4)) % (int)Math.pow(2, 32); break;
            case 1: d = (a + leftRotate(d + H(a, b, c) + words[startingIndex + (3 * i + 5) % 16] + constants[i], 11)) % (int)Math.pow(2, 32); break;
            case 2: c = (d + leftRotate(c + H(d, a, b) + words[startingIndex + (3 * i + 5) % 16] + constants[i], 16)) % (int)Math.pow(2, 32); break;
            case 3: b = (c + leftRotate(b + H(c, d, a) + words[startingIndex + (3 * i + 5) % 16] + constants[i], 23)) % (int)Math.pow(2, 32); break;
          }
        } else {
          switch (i % 4) {
            case 0: a = (b + leftRotate(a + I(b, c, d) + words[startingIndex + (7 * i) % 16] + constants[i], 6)) % (int)Math.pow(2, 32); break;
            case 1: d = (a + leftRotate(d + I(a, b, c) + words[startingIndex + (7 * i) % 16] + constants[i], 10)) % (int)Math.pow(2, 32); break;
            case 2: c = (d + leftRotate(c + I(d, a, b) + words[startingIndex + (7 * i) % 16] + constants[i], 15)) % (int)Math.pow(2, 32); break;
            case 3: b = (c + leftRotate(b + I(c, d, a) + words[startingIndex + (7 * i) % 16] + constants[i], 21)) % (int)Math.pow(2, 32); break;
          }
        }
      }
      a0 += a; b0 += b; c0 += c; d0 += d;
    }
    return toLittleEndianStr(a0 % (int)Math.pow(2, 32)) + toLittleEndianStr(b0 % (int)Math.pow(2, 32)) + toLittleEndianStr(c0 % (int)Math.pow(2, 32)) + toLittleEndianStr(d0 % (int)Math.pow(2, 32));
  }

  public static String toLittleEndianStr(int num) {
    String[] arr = new String[4];
    for (int i = 0; i < 4; i++) {
      String part = Integer.toHexString(num >>> i * 8 & 0xFF);
      part = "0".repeat(2 - part.length()) + part;
      arr[i] = part;
    }
    String littleEndianStr = "";
    for (String str : arr) {
      littleEndianStr += str;
    }
    return littleEndianStr;
  }

  public static int leftRotate(int num, int shift) {
    return (num << shift) | (num >>> (32 - shift));
  }

  public static int F(int X, int Y, int Z) {
    return X & Y | ~X & Z;
  }

  public static int G(int X, int Y, int Z) {
    return X & Z | Y & ~Z;
  }

  public static int H(int X, int Y, int Z) {
    return X ^ Y ^ Z;
  }

  public static int I(int X, int Y, int Z) {
    return Y ^ (X | ~Z);
  }

}
