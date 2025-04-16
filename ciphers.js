// ciphers.js

function mod(n, m) {
    return ((n % m) + m) % m;
  }
  
  // Caesar Cipher
  function caesarEncrypt(text, key) {
    key = parseInt(key);
    return text.replace(/[a-z]/gi, c =>
      String.fromCharCode((c.charCodeAt(0) - (c < 'a' ? 65 : 97) + key) % 26 + (c < 'a' ? 65 : 97)));
  }
  function caesarDecrypt(text, key) {
    return caesarEncrypt(text, -parseInt(key));
  }
  
  // Atbash Cipher
  function atbashTransform(text) {
    return text.replace(/[a-z]/gi, c =>
      String.fromCharCode((c < 'a' ? 90 : 122) - (c.charCodeAt(0) - (c < 'a' ? 65 : 97))));
  }
  
  // August Cipher (similar to Caesar with fixed shift 7)
  function augustEncrypt(text) {
    return caesarEncrypt(text, 7);
  }
  function augustDecrypt(text) {
    return caesarDecrypt(text, 7);
  }
  
  // Affine Cipher
  function affineEncrypt(text, key) {
    const [a, b] = key.split(',').map(Number);
    const m = 26;
    return text.replace(/[a-z]/gi, c => {
      let base = c < 'a' ? 65 : 97;
      let x = c.charCodeAt(0) - base;
      return String.fromCharCode(mod(a * x + b, m) + base);
    });
  }
  function affineDecrypt(text, key) {
    const [a, b] = key.split(',').map(Number);
    const m = 26;
    const a_inv = modInverse(a, m);
    return text.replace(/[a-z]/gi, c => {
      let base = c < 'a' ? 65 : 97;
      let y = c.charCodeAt(0) - base;
      return String.fromCharCode(mod(a_inv * (y - b), m) + base);
    });
  }
  function modInverse(a, m) {
    for (let x = 1; x < m; x++) if ((a * x) % m === 1) return x;
    throw Error('No modular inverse');
  }
  
  // Vigenère Cipher
  function vigenereEncrypt(text, key) {
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    let i = 0;
    return text.replace(/[a-z]/gi, c => {
      const isUpper = c < 'a';
      const base = isUpper ? 65 : 97;
      const shift = key.charCodeAt(i++ % key.length) - 65;
      return String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base);
    });
  }
  function vigenereDecrypt(text, key) {
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    let i = 0;
    return text.replace(/[a-z]/gi, c => {
      const isUpper = c < 'a';
      const base = isUpper ? 65 : 97;
      const shift = key.charCodeAt(i++ % key.length) - 65;
      return String.fromCharCode(mod(c.charCodeAt(0) - base - shift, 26) + base);
    });
  }
  
  // Gronsfeld Cipher (like Vigenère with digits)
  function gronsfeldEncrypt(text, key) {
    let i = 0;
    return text.replace(/[a-z]/gi, c => {
      const shift = parseInt(key[i++ % key.length]);
      const base = c < 'a' ? 65 : 97;
      return String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base);
    });
  }
  function gronsfeldDecrypt(text, key) {
    let i = 0;
    return text.replace(/[a-z]/gi, c => {
      const shift = parseInt(key[i++ % key.length]);
      const base = c < 'a' ? 65 : 97;
      return String.fromCharCode(mod(c.charCodeAt(0) - base - shift, 26) + base);
    });
  }
  
  // Beaufort Cipher
  function beaufortTransform(text, key) {
    key = key.toUpperCase();
    let i = 0;
    return text.replace(/[a-z]/gi, c => {
      const base = c < 'a' ? 65 : 97;
      const ci = c.toUpperCase().charCodeAt(0) - 65;
      const ki = key.charCodeAt(i++ % key.length) - 65;
      return String.fromCharCode(mod(ki - ci, 26) + base);
    });
  }
  
  // Autoclave Cipher (Running Key)
  function autoclaveEncrypt(text, key) {
    key = (key + text).toUpperCase();
    let i = 0;
    return text.replace(/[a-z]/gi, c => {
      const shift = key.charCodeAt(i++) - 65;
      const base = c < 'a' ? 65 : 97;
      return String.fromCharCode((c.charCodeAt(0) - base + shift) % 26 + base);
    });
  }
  function autoclaveDecrypt(text, key) {
    let fullKey = key.toUpperCase();
    let result = '';
    for (let i = 0; i < text.length; i++) {
      let shift = fullKey.charCodeAt(i) - 65;
      const base = text[i] < 'a' ? 65 : 97;
      let decryptedChar = String.fromCharCode(mod(text.charCodeAt(i) - base - shift, 26) + base);
      result += decryptedChar;
      fullKey += decryptedChar.toUpperCase();
    }
    return result;
  }
  
  // N-Gram 
  function ngramTransform(text, key) {
    let n = parseInt(key);
    let result = '';
    for (let i = 0; i < text.length; i += n) {
      result += text.slice(i, i + n).split('').reverse().join('');
    }
    return result;
  }
  
  // Hill Cipher (2x2 for simplicity)
  function hillEncrypt(text, key) {
    let [a, b, c, d] = key.split(',').map(Number);
    text = text.toUpperCase().replace(/[^A-Z]/g, '');
    if (text.length % 2 !== 0) text += 'X';
    let result = '';
    for (let i = 0; i < text.length; i += 2) {
      let x = text.charCodeAt(i) - 65;
      let y = text.charCodeAt(i + 1) - 65;
      let p1 = mod(a * x + b * y, 26);
      let p2 = mod(c * x + d * y, 26);
      result += String.fromCharCode(p1 + 65) + String.fromCharCode(p2 + 65);
    }
    return result;
  }
  function hillDecrypt(text, key) {
    let [a, b, c, d] = key.split(',').map(Number);
    let det = mod(a * d - b * c, 26);
    let detInv = modInverse(det, 26);
    let na = mod(detInv * d, 26), nb = mod(-detInv * b, 26);
    let nc = mod(-detInv * c, 26), nd = mod(detInv * a, 26);
    return hillEncrypt(text, [na, nb, nc, nd].join(','));
  }
  
  // Rail Fence Cipher
  function railEncrypt(text, key) {
    key = parseInt(key);
    let rail = Array.from({ length: key }, () => []);
    let dir = 1, row = 0;
    for (let c of text) {
      rail[row].push(c);
      if (row === 0 || row === key - 1) dir *= -1;
      row += dir;
    }
    return rail.flat().join('');
  }
  function railDecrypt(text, key) {
    key = parseInt(key);
    let len = text.length;
    let rail = Array.from({ length: key }, () => Array(len).fill(null));
    let dir = 1, row = 0;
    for (let i = 0; i < len; i++) {
      rail[row][i] = '*';
      if (row === 0 || row === key - 1) dir *= -1;
      row += dir;
    }
    let index = 0;
    for (let r = 0; r < key; r++) {
      for (let c = 0; c < len; c++) {
        if (rail[r][c] === '*') rail[r][c] = text[index++];
      }
    }
    row = 0, dir = 1;
    let result = '';
    for (let c = 0; c < len; c++) {
      result += rail[row][c];
      if (row === 0 || row === key - 1) dir *= -1;
      row += dir;
    }
    return result;
  }
  
  // Route Cipher 
  function routeEncrypt(text, key) {
    key = parseInt(key);
    let rows = Math.ceil(text.length / key);
    let grid = Array.from({ length: rows }, (_, r) => text.slice(r * key, (r + 1) * key).split(''));
    let result = '';
    for (let col = 0; col < key; col++) {
      for (let row = 0; row < rows; row++) {
        result += grid[row][col] || '';
      }
    }
    return result;
  }
  function routeDecrypt(text, key) {
    key = parseInt(key);
    let rows = Math.ceil(text.length / key);
    let grid = Array.from({ length: rows }, () => Array(key).fill(''));
    let idx = 0;
    for (let col = 0; col < key; col++) {
      for (let row = 0; row < rows; row++) {
        if (idx < text.length) grid[row][col] = text[idx++];
      }
    }
    return grid.flat().join('');
  }
  
  // Myszkowski Cipher 
  function myszkowskiEncrypt(text, key) {
    const order = key.split('').map((k, i) => [k, i]).sort().map(x => x[1]);
    let rows = Math.ceil(text.length / key.length);
    let matrix = Array.from({ length: rows }, (_, i) => text.slice(i * key.length, (i + 1) * key.length).split(''));
    let result = '';
    for (let col of order) {
      for (let row of matrix) {
        if (row[col]) result += row[col];
      }
    }
    return result;
  }
  function myszkowskiDecrypt(text, key) {
    const len = key.length;
    const rows = Math.ceil(text.length / len);
    const totalCells = rows * len;
    const blanks = totalCells - text.length;
    const order = key.split('').map((k, i) => [k, i]).sort().map(x => x[1]);
    let pos = 0;
    let grid = Array.from({ length: rows }, () => Array(len).fill(''));
    for (let col of order) {
      for (let row = 0; row < rows; row++) {
        if (row === rows - 1 && col >= len - blanks) continue;
        grid[row][col] = text[pos++];
      }
    }
    return grid.flat().join('');
  }
  
  function processText(encrypt) {
    const cipher = document.getElementById('cipherSelect').value;
    const key = document.getElementById('keyInput').value;
    const text = document.getElementById('inputText').value;
    let result = '';
  
    try {
      switch (cipher) {
        case 'Caesar': result = encrypt ? caesarEncrypt(text, key) : caesarDecrypt(text, key); break;
        case 'Atbash': result = atbashTransform(text); break;
        case 'August': result = encrypt ? augustEncrypt(text) : augustDecrypt(text); break;
        case 'Affine': result = encrypt ? affineEncrypt(text, key) : affineDecrypt(text, key); break;
        case 'Vigenere': result = encrypt ? vigenereEncrypt(text, key) : vigenereDecrypt(text, key); break;
        case 'Gronsfeld': result = encrypt ? gronsfeldEncrypt(text, key) : gronsfeldDecrypt(text, key); break;
        case 'Beaufort': result = beaufortTransform(text, key); break;
        case 'Autoclave': result = encrypt ? autoclaveEncrypt(text, key) : autoclaveDecrypt(text, key); break;
        case 'N-Gram': result = ngramTransform(text, key); break;
        case 'Hill': result = encrypt ? hillEncrypt(text, key) : hillDecrypt(text, key); break;
        case 'Rail Fence': result = encrypt ? railEncrypt(text, key) : railDecrypt(text, key); break;
        case 'Route': result = encrypt ? routeEncrypt(text, key) : routeDecrypt(text, key); break;
        case 'Myszkowski': result = encrypt ? myszkowskiEncrypt(text, key) : myszkowskiDecrypt(text, key); break;
        default: result = 'Invalid Cipher';
      }
    } catch (e) {
      result = 'Error: ' + e.message;
    }
  
    document.getElementById('outputText').value = result;
  }