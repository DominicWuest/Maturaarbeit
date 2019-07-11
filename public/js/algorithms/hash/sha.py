from copy import deepcopy

b = 1600; w = 64; l = 6; nr = 12 + 2 * l

outputLength = 224 # / 256 / 384 / 512

def hashSHA(message):
    inputBits = stringToBitArray(message) + [0, 1]
    A = []
    chunks = []
    for i in range(len(inputBits) // (b - 2 * outputLength) + 1): chunks.append(inputBits[i * (b - 2 * outputLength):(i + 1) * (b - 2 * outputLength)])
    for chunk in chunks:
        aA = messageBitsToState(chunk)
        if len(A) != 0:
            for x in range(5):
                for y in range(5):
                    for z in range(w): aA[x][y][z] ^= A[x][y][z]
        A = aA
        for i in range(nr):
            A = keccakRound(A, i)
    return stateToLittleEndianHexString(A)[:outputLength // 4]

def stateToLittleEndianHexString(A):
    binString = stateToBinString(A)
    hexString = ''
    for i in range(len(binString) // 8):
        hexElement = hex(int((binString[i * 8:(i + 1) * 8])[::-1], 2))[2:]
        hexElement = (2 - len(hexElement)) * '0' + hexElement
        hexString += hexElement
    return hexString

def stateToBinString(A):
    laneStr = ''
    for y in range(5):
        for x in range(5): laneStr += ''.join(str(i) for i in A[x][y])
    return laneStr

def stringToBitArray(string):
    arr = []
    for char in string:
        charBits = (bin(ord(char))[2:])[::-1]
        while len(charBits) < 8: charBits += '0'
        arr += [int(bit) for bit in charBits]
    return arr

def messageBitsToState(bitArray):
    aA = bitPadding(bitArray)
    A = []
    for x in range(5):
        yArr = []
        for y in range(5):
            zArr = []
            for z in range(w): zArr.append(aA[w * (5 * y + x) + z])
            yArr.append(zArr)
        A.append(yArr)
    return A

def bitPadding(arr):
    capacity = 2 * outputLength
    rate = b - capacity
    if len(arr) != rate:
        zeros = (-len(arr) - 2) % rate
        arr.append(1)
        arr += zeros * [0]
        arr.append(1)
    while len(arr) % b != 0: arr.append(0)
    return arr

keccakRound = lambda A, i: iota(chi(pi(rho(theta(A)))), i)

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

def rho(A):
    aA = deepcopy(A)
    x = 1; y = 0
    for t in range(24):
        for z in range(w): aA[x][y][(z + (t + 1) * (t + 2) // 2) % w] = A[x][y][z]
        x, y = y, (2 * x + 3 * y) % 5
    return aA

def pi(A):
    aA = deepcopy(A)
    for x in range(5):
        for y in range(5):
            for z in range(w): aA[x][y][z] = A[(x + 3 * y) % 5][x][z]
    return aA

def chi(A):
    aA = deepcopy(A)
    for x in range(5):
        for y in range(5):
            for z in range(w): aA[x][y][z] ^= (A[(x + 1) % 5][y][z] ^ 1) & A[(x + 2) % 5][y][z]
    return aA

def iota(A, i):
    RC = w * [0]
    for j in range(l + 1): RC[2 ** j - 1] = roundConstants(j + 7 * i)
    for z in range(w): A[0][0][z] ^= RC[z]
    return A

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
