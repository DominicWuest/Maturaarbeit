# Nötiger Import
from copy import deepcopy

# Die meisten Variablen sind benannt nach den FEDERAL INFORMATION PROCESSING STANDARDS (NIST) (https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf)
# A' wird als aA geschrieben

# Konstanten für die Hash-Funktion
b = 1600; w = 64; l = 6; nr = 12 + 2 * l

# Die Länge des produzierten Hash-Values in Bits
outputLength = 224 # oder: 256 / 384 / 512

# Diese Funktion nimmt einen String entgegen und gibt dessen Hash-Value zurück
def hashSHA(message):
    # Die Bits des Parameters mit dem für den SHA3-Algorithmus charakteristischen Suffix [0, 1]
    inputBits = stringToBitArray(message) + [0, 1]
    # Der momentane State
    A = []
    # Der Array inputBits wird in (b - 2 * outputLength) grosse Chunks geteilt und zum Array Chunks appendet
    chunks = []
    for i in range(len(inputBits) // (b - 2 * outputLength) + 1): chunks.append(inputBits[i * (b - 2 * outputLength):(i + 1) * (b - 2 * outputLength)])
    # Über die Chunks wird iteriert
    for chunk in chunks:
        # Der Chunk wird zu einem State modifiziert
        aA = messageBitsToState(chunk)
        # Falls bereits über ein Chunk iteriert wurde, wird jedes bit von aA ge-XOR-t mit dem Bit des momentanen States
        if len(A) != 0:
            for x in range(5):
                for y in range(5):
                    for z in range(w): aA[x][y][z] ^= A[x][y][z]
        # Der momentane State ist nun der neue State
        A = aA
        # nr mal wird das five step mapping auf den neuen State angewendet
        for i in range(nr): A = keccakRound(A, i)
    # Der Hash-Value wird zurückgegeben
    return stateToLittleEndianHexString(A)[:outputLength // 4] # Dividiert durch vier, da ein Hex-String zurückgegeben wird

# Diese Funktion gibt einen Little-Endian-Hex-String des States A zurück
def stateToLittleEndianHexString(A):
    # Der State als Binary-String
    binString = stateToBinString(A)
    hexString = ''
    # Über jedes Byte wird iteriert
    for i in range(len(binString) // 8):
        # Das Byte wird zu einem Little-Endian-Hex-Value konvertiert
        byte = hex(int((binString[i * 8:(i + 1) * 8])[::-1], 2))[2:]
        # Das Byte wird gepaddet, damit es zwei Characters lang ist
        byte = (2 - len(byte)) * '0' + byte
        # Das Byte wird zum hexString hinzugefügt
        hexString += byte
    return hexString

# Diese Funktion konvertiert einen State zu einem Binary-String
def stateToBinString(A):
    # Der Algorithmus gemäss den FEDERAL INFORMATION PROCESSING STANDARDS
    binStr = ''
    for y in range(5):
        for x in range(5): binStr += ''.join(str(i) for i in A[x][y])
    return binStr

# Diese Funktion konvertiert einen String zu einem Binary-Array
def stringToBitArray(string):
    # Der Binary-Array
    arr = []
    # Über jeden Character des Strings wird iteriert
    for char in string:
        # Der Character als Little-Endian-Binary-String
        byte = (bin(ord(char))[2:])[::-1]
        # Das Byte wird gepaddet
        while len(byte) < 8: byte += '0'
        # Zum Array wird jedes Bit des Bytes appendet
        arr += [int(bit) for bit in byte]
    return arr

# Diese Funktion konvertiert die Bits einer Nachricht, mit maximaler Länge (b - 2 * outputLength), zu einem State
def messageBitsToState(bitArray):
    # Der Input wird gepaddet
    aA = bitPadding(bitArray)
    # Der State
    A = []
    # Der Algorithmus gemäss den FEDERAL INFORMATION PROCESSING STANDARDS
    for x in range(5):
        yArr = []
        for y in range(5):
            zArr = []
            for z in range(w): zArr.append(aA[w * (5 * y + x) + z])
            yArr.append(zArr)
        A.append(yArr)
    # Der neue State wird zurückgegeben
    return A

# Diese Funktion gibt den Array zurück, nachdem die pad10*1 Funktion darauf angewendet wurde
def bitPadding(arr):
    # Die Kapazität des Algorithmus
    capacity = 2 * outputLength
    # Die Rate des Algorithmus
    rate = b - capacity
    # Falls der Array schon rate Bits lange ist, muss die Rate nicht gepaddet werden
    if len(arr) != rate:
        # Zum Array wird ein Bit mit Wert 1 appendet, danach so viele Bits mit Wert 0, bis die Länge des Arrays der Rate entspricht
        # danach wird nochmals ein Bit mit Wert 1 appendet
        zeros = (-len(arr) - 2) % rate
        arr.append(1)
        arr += zeros * [0]
        arr.append(1)
    # Der Array wird mit Bits mit Wert 0 gefüllt, bis dessen Länge b entspricht
    while len(arr) % b != 0: arr.append(0)
    return arr

# Gibt den State zurück, nachdem das five step mapping darauf angewendet wurde
keccakRound = lambda A, i: iota(chi(pi(rho(theta(A)))), i)

# Die erste Funktion des five step mappings
def theta(A):
    C = []
    for x in range(5):
        CArr = []
        for z in range(w):
            num = 0
            for y in range(5): num ^= A[x][y][z]
            CArr.append(num)
        C.append(CArr)
    D = []
    for x in range(5):
        zArr = []
        for z in range(w): zArr.append(C[(((x - 1) % 5) + 5) % 5][z] ^ C[(x + 1) % 5][(((z - 1) % w) + w) % w])
        D.append(zArr)
    aA = A
    for x in range(5):
        for y in range(5):
            for z in range(w): aA[x][y][z] = A[x][y][z] ^ D[x][z]
    return aA

# Die zweite Funktion des five step mappings
def rho(A):
    aA = deepcopy(A)
    x = 1; y = 0
    for t in range(24):
        for z in range(w): aA[x][y][(z + (t + 1) * (t + 2) // 2) % w] = A[x][y][z]
        x, y = y, (2 * x + 3 * y) % 5
    return aA

# Die dritte Funktion des five step mappings
def pi(A):
    aA = deepcopy(A)
    for x in range(5):
        for y in range(5):
            for z in range(w): aA[x][y][z] = A[(x + 3 * y) % 5][x][z]
    return aA

# Die vierte Funktion des five step mappings
def chi(A):
    aA = deepcopy(A)
    for x in range(5):
        for y in range(5):
            for z in range(w): aA[x][y][z] ^= (A[(x + 1) % 5][y][z] ^ 1) & A[(x + 2) % 5][y][z]
    return aA

# Die fünfte Funktion des five step mappings
def iota(A, i):
    RC = w * [0]
    for j in range(l + 1): RC[2 ** j - 1] = roundConstants(j + 7 * i)
    for z in range(w): A[0][0][z] ^= RC[z]
    return A

# Diese Funktion gibt eine Konstante zurück, welche von der Rundennummer abhängt. Wird von der Funktion iota gerufen
def roundConstants(t):
    if t % 255 == 0: return 1
    R = [1, 0, 0, 0, 0, 0, 0, 0]
    for i in range(t % 255):
        R = [0] + R
        R[0] ^= R[8]
        R[4] ^= R[8]
        R[5] ^= R[8]
        R[6] ^= R[8]
        R = R[:-1]
    return R[0]
