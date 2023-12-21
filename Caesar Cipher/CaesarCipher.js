function decrypt(isDecrypt) {
    var shiftText = document.getElementById("shift").value;
    var shift = parseInt(shiftText, 10);
    if (isDecrypt) shift = (26 - shift) % 26;
    var textElem = document.getElementById("inputText");
    textElem.value = caesarShift(textElem.value, shift);
  }
  
  function caesarShift(text, shift) {
    var shift = parseInt(shift, 10);
    var result = "";
  
    for (var i = 0; i < text.length; i++) {
      var c = text.charCodeAt(i);
  
      if (65 <= c && c <= 90)
        result += String.fromCharCode(((c - 65 + shift) % 26) + 65);
      // Uppercase
      else if (97 <= c && c <= 122)
        result += String.fromCharCode(((c - 97 + shift) % 26) + 97);
      // Lowercase
      else result += text.charAt(i);
    }
    var textElem = document.getElementById("inputText");
    textElem.value = result;
    return result;
  }
  
  document.getElementById("clipboard").addEventListener("click", copyToClipboard);
  
  function copyToClipboard() {
    let textArea = document.createElement("textarea");
    const emptyResultField = inputText.value;
  
    if (!emptyResultField) {
      return;
    }
    textArea.value = inputText.value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
  
    alert("Caesaris codice copied to clipboard!");
  }
  