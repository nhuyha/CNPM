window.onload = initAll;
var usedNums = new Array(25);
const fs = require('fs');
function read_text(filename) {
    try {
      // Đọc nội dung của tệp văn bản
      const data = fs.readFileSync(filename, 'utf8');
      
      // Tách nội dung thành các dòng
      const lines = data.split('\n');
      
      // Trả về mảng các dòng
      return lines;
    } catch (err) {
      console.error('Lỗi khi đọc tệp:', err);
      return [];
    }
  }
const answer=read_text('answers.txt')
function initAll() {
  if (document.getElementById) {
    document.getElementById("reload").onclick = anotherCard;
    newCard();
  }
  else{
    alert("Your browser does not support this script.");
  }
}

function newCard() {
  for(var i=0 ; i<25 ; i++){
      setSquare(i);
    }
}

function setSquare(thisSquare){
  var currentSquare = "square" + thisSquare;
  var newNum = thisSquare;

  /*while(usedNums[newNum]) {
    newNum =getNewNum();
  };
  
  usedNums[newNum] = true;*/
  document.getElementById(currentSquare).innerHTML = answer[newNum];
}

function getNewNum() {
  return Math.floor(Math.random() * 25);
}

function anotherCard() {
  for (var i = 1; i < usedNums.length; i++) {
    usedNums[i] = false;
  };

  newCard();
  return false;
}
