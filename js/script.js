/**
 * /*
 *   Advices
 *   - Always Check The Console
 *   - Take Your Time To Name The Identifiers
 *   - DRY
 *
 *   Steps To Create The Project
 *   [01] Create HTML Markup
 *   [02] Add Styling And Separate From Logic
 *   [03] Create The App Logic
 *   ---- [01] Add Levels
 *   ---- [02] Show Level And Seconds
 *   ---- [03] Add Array Of Words
 *   ---- [04] ِAdd Start Game Button
 *   ---- [05] Generate Upcoming Words
 *   ---- [06] Disable Copy Word And Paste Event + Focus On Input
 *   ---- [07] Start Play Function
 *   ---- [08] Start The Time And Count Score
 *   ---- [09] Add The Error And Success Messages
 *   [04] Your Trainings To Add Features
 *   ---- [01] Save Score To Local Storage With Date
 *   ---- [02] Choose Levels From Select Box
 *   ---- [03] Break The Logic To More Functions
 *   ---- [04] Choose Array Of Words For Every Level
 *   ---- [05] Write Game Instruction With Dynamic Values
 *   ---- [06] Add 3 Seconds For The First Word
 *
 * @format
 */

//=====================================================================================
// English Words list
const easyWords = [
    "Code",
    "Town",
    "Task",
    "Test",
    "Rust",
    "Scala",
    "Hello",
    "Funny",
    "Roles",
    "Python",
  ],
  normalWords = [
    "Coding",
    "Runner",
    "Github",
    "Twitter",
    "Testing",
    "Styling",
    "Cascade",
    "Country",
    "Working",
    "Youtube",
  ],
  hardWords = [
    "Playing",
    "Linkedin",
    "Leetcode",
    "Internet",
    "Paradigm",
    "Javascript",
    "Programming",
    "Destructuring",
    "Documentation",
    "Dependencies",
  ];
let words = [];

//=====================================================================================
// Arabic Words list
let arEasyWords = [
  "حب",
  "علم",
  "جزاء",
  "مودة",
  "رقي",
  "غناء",
  "كتاب",
  "مسمار",
  "دراق",
  "مدحت",
];
let arNormalWords = [
  "مسلسل",
  "استجمام",
  "استمالة",
  "اجنبي",
  "زيتون",
  "اغصان",
  "اعلام",
  "مناورات",
  "كلمات",
  "السيد",
];
let arHardWords = [
  "استدلالات",
  "مناقشات",
  "أحمد",
  "أمناء",
  "جريء",
  "أشرف",
  "استكمال",
  "معاملات",
  "مضاربة",
  "استثناء",
];

let lang = "Ar";
// Setting Levels
const lvls = {
  Turtle: 7,
	Easy: 5,
	Normal: 3,
	Hard: 2,
};

//=====================================================================================
// Default Level
let defaultLevelName = "Normal"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];
let langGet;

//=====================================================================================
//select your level to play
let levelGet = document.querySelector(".level");

defaultLevelName = levelGet[levelGet.selectedIndex].value;

defaultLevelSeconds = lvls[defaultLevelName];

//=====================================================================================
// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let lvlStart = document.querySelector(".lvl-start");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let picturesDiv = document.querySelector(".pictures");
let historyDiv = document.querySelector(".history");
let goodPicture = `<img class="img-good"src="good.gif" alt="" />`;
let badPicture = `<img class="img-bad" src="bad1.gif" alt="" /> <img class="img-bad" src="bad2.jpg" alt="" />`;


let username;
let userLocal;
//=====================================================================================
// Disable Paste Event // عشان العالم الصايعة
input.onpaste = function () {
  return false;
};
//=====================================================================================
//get username from localStorage
username = window.localStorage.getItem('username');
function userGet() {
  usernameGet = document.getElementById("username").value;
  if(usernameGet !== ""){
    userLocal = window.localStorage.setItem("username", usernameGet);
    username = window.localStorage.username;
  }else{
    username = window.localStorage.username;
  }
  // userArr = [];
}
startButton.onclick = function () {
  username = window.localStorage.getItem("username");
  langGet = document.getElementById("lang").value;
  lang = langGet;
  reportLevel();
	lvlStart.remove();
  input.focus();
  var timeleft = 3;
  var firstStart = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(firstStart);
      theWord.innerHTML = "Start";
      genWords();
    } else {
      theWord.innerHTML = timeleft + " seconds begin";
    }
    timeleft -= 1;
  }, 1000);
};
//=====================================================================================
// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length; // Total words count dynamic

function reportLevel() {
  defaultLevelName = levelGet[levelGet.selectedIndex].value;
  defaultLevelSeconds = lvls[defaultLevelName];
  console.log(`current level is: ${defaultLevelName}`);
  console.log(`current level Seconds are: ${defaultLevelSeconds}`);
  
  //=====================================================================================
  // Setting Level Name + Seconds + Score
  lvlNameSpan.innerHTML = defaultLevelName;
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  //=====================================================================================
// change word group and count depending on level
if (defaultLevelName == "Turtle" && lang == "En") {
	words = [];
	words = easyWords;
} else if (defaultLevelName == "Turtle" && lang == "Ar") {
  words = [];
	words = arEasyWords;
} else if (defaultLevelName == "Easy" && lang == "Ar") {
  words = [];
	words = arEasyWords;
} else if (defaultLevelName == "Easy" && lang == "En") {
  words = [];
	words = easyWords;
} else if (defaultLevelName == "Normal" && lang == "Ar") {
  words = [];
	words = words.concat(arEasyWords, arNormalWords);
} else if (defaultLevelName == "Normal" && lang == "En") {
  words = [];
	words = words.concat(easyWords, normalWords);
} else if (defaultLevelName == "Hard" && lang == "Ar") {
  words = [];
	words = words.concat(arEasyWords, arNormalWords, arHardWords);
} else if (defaultLevelName == "Hard" && lang == "En") {
  words = [];
	words = words.concat(easyWords, normalWords, hardWords);
} else {
  words = ["SomethingWrong"];
}
scoreTotal.innerHTML = words.length;
// Total words count dynamic
}

//generate Word function
function genWords() {
  //get random words from array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  console.log(randomWord);
  theWord.innerHTML = randomWord;
  // words.pop(randomWord);
  // console.log(words.length);
  let wordIndex = words.indexOf(randomWord);
  words.splice(wordIndex, 1);
  upcomingWords.innerHTML = "";
  //generateWords
  for (let i = 0; i < words.length; i++) {
    //create div element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Start Play Function
  startPlay();
}
// Storing Score by date to Local Storage
let storeTheScore;
var today = new Date();
var date =today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var time ;
var dateTime;	
let recScore;

let userArr=[];
if (window.localStorage.getItem(username) == null) {
	userArr = [];
} else {
	userArr = window.localStorage.getItem(username).split(",");
}

let historyFill = `<span> Your previous Scores are: </span>${	document.querySelector(".Normal").innerHTML} ${userArr} <br/>${username} `;


for (let i = 0; i < userArr.length; i++) {
  console.log(userArr[i]);
};





function saveScore(){
if (window.localStorage.getItem(username) == null) {
	userArr = [];
  }else {
	userArr = window.localStorage.getItem(username).split(",");
}
  time =
	today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
dateTime = date + " " + time;
  userArr[userArr.length++] = [dateTime, scoreGot.innerHTML];
recScore = window.localStorage.setItem(username,userArr);
  console.log(localStorage.getItem(username));
}


console.log(document.querySelector(".Normal").innerHTML);




function clearResults() {
  window.localStorage.clear();
}

function startPlay() {
  let spanText;
  let spanTextArGood = document.createTextNode(`
  انت معلم يا
  ${username}
  </br>
  وبرنس البرانيس كلهم 
  `);
  let spanTextEnGood = document.createTextNode(`${username}...You Rock !!`);
  let spanTextEnBad  = document.createTextNode(
    `Sorry, ${username}... Game Over`
    );
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    let spanTextArBad  = document.createTextNode(`
  ${username}
             معلش يا ابو الصحاب</br>
          حاول تاني وخليك سريع
            `);
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      //compare words
      if (
        theWord.innerHTML.toLocaleLowerCase() ===
        input.value.toLocaleLowerCase()
      ) {
      
        console.log("done");
        input.value = "";
        scoreGot.innerHTML++;
        if (words.length > 0) {
          genWords();
        } else {
          saveScore();
          let span = document.createElement("span");
          span.className = "good";
          picturesDiv.innerHTML = goodPicture;
          historyDiv.innerHTML = historyFill;
          
          if(lang == "Ar"){
            spanText = spanTextArGood;
          }else{
            spanText = spanTextEnGood;
          }
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          upcomingWords.remove();
          input.remove();
          theWord.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
                  if (lang == "Ar") {
                    spanText = spanTextArBad;
									} else {
                    spanText = spanTextEnBad;
									}
                  picturesDiv.innerHTML = badPicture;
                  historyDiv.innerHTML = historyFill;
                  span.appendChild(spanText);
                  finishMessage.appendChild(span);
                  upcomingWords.remove();
                  input.remove();
                  theWord.remove();
                  saveScore();
      }
    }
  }, 1000);
}
