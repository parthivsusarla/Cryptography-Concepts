# Cryptography-Concepts
This repository consists of 13 ciphers implemented in javascript. A webpage is created for the user to play with the implementation of the cipher of their choice


**Caesar Cipher:**
  * **Encryption:** Shifts each letter in the plaintext a fixed number of positions down the alphabet.
  * **Decryption:** Shifts each letter in the ciphertext the same fixed number of positions up the alphabet.

**Atbash Cipher:**
  * **Encryption:** Reverses the alphabet, so 'A' becomes 'Z', 'B' becomes 'Y', and so on.
  * **Decryption:** Applies the same reversal process to the ciphertext.

**August Cipher:**
  * **Encryption:** Ceaser Cipher with a shift of 1
  * **Decryption:** Similar to ceaser cipher decryption but with a shit of 1

**Affine Cipher:**
  * **Encryption:** Applies a linear function $(ax + b) \mod m$ to each letter, where $a$ and $b$ are keys and $m$ is the alphabet size.
  * **Decryption:** Applies the inverse linear function $((y - b) \cdot a^{-1}) \mod m$ to each letter, where $a^{-1}$ is the modular multiplicative inverse of $a$.

**Vigenère Cipher:**
  * **Encryption:** Uses a keyword to shift each letter of the plaintext by a different amount, determined by the corresponding letter in the keyword.
  * **Decryption:** Uses the same keyword to shift each letter of the ciphertext back by the amount determined by the corresponding keyword letter.

**Gronsfeld Cipher:**
  * **Encryption:** Similar to Vigenère but uses a numerical keyword where each digit determines the shift for the corresponding plaintext letter.
  * **Decryption:** Shifts each ciphertext letter back by the amount specified by the corresponding digit in the numerical keyword.
  
**Beaufort Cipher:**
  * **Encryption:** The ciphertext letter is found by subtracting the plaintext letter from the keyword letter (modulo the alphabet size).
  * **Decryption:** The plaintext letter is found by subtracting the keyword letter from the ciphertext letter (modulo the alphabet size).

**Autokey/Running Key Cipher:**
  * **Encryption:** The keyword is extended by appending the plaintext itself, and this running key is used to shift the plaintext letters (similar to Vigenère).
  * **Decryption:** Requires knowing the initial part of the key to decrypt the first few letters, which then reveals parts of the running key needed to decrypt subsequent letters.

**N-gram Operations:**
  * **Encryption:** These are not standalone ciphers but techniques that operate on sequences of $n$ letters (n-grams) for various cryptographic purposes like frequency analysis or substitution.
  * **Decryption:** The decryption method depends entirely on the specific cryptographic algorithm employing n-gram operations.

**Hill Cipher:**
  * **Encryption:** Groups plaintext letters into vectors and multiplies each vector by a key matrix (modulo the alphabet size).
  * **Decryption:** Multiplies each ciphertext vector by the inverse of the key matrix (modulo the alphabet size).

**Rail Fence Cipher:**
  * **Encryption:** Writes plaintext letters diagonally down a specified number of "rails" and then reads the rows horizontally.
  * **Decryption:** Reverses the process by writing the ciphertext diagonally on the rails and then reading it row by row.

**Route Cipher:**
  * **Encryption:** Arranges the plaintext in a grid and then reads it off in a specific pattern (e.g., spiral, diagonals).
  * **Decryption:** Requires knowing the grid dimensions and the reading route to write the ciphertext into the grid and then read out the original plaintext.

**Myszkowski Transposition:**
  * **Encryption:** Writes the plaintext in rows under a keyword, and then the columns are permuted based on the alphabetical order of the keyword letters, and the ciphertext is read column by column.
  * **Decryption:** Requires knowing the keyword to reconstruct the grid by ordering the ciphertext columns based on the keyword's alphabetical order, and then reading the rows.
