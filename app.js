var userScore = 0;
var computerScore = 0;
const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("comp-score");
const scoreBoard_div = document.querySelector(".scoreboard");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
var remaining_time = document.querySelector("#time");

function getCompChoice() {
  const choices = ["r", "p", "s"];
  const randomNo = Math.floor(Math.random() * 3);

  return choices[randomNo];
}

function convertToWord(letter) {
  if (letter === "r") return "Rock";
  if (letter === "p") return "Paper";
  return "Scissors";
}

function win(user, comp) {
  const smallUWord = "user".fontsize(3).sup();
  const smallCWord = "comp".fontsize(3).sup();
  const user_div = document.getElementById(user);

  userScore++;
  userScore_span.innerHTML = userScore;
  compScore_span.innerHTML = computerScore;

  result_p.innerHTML = `${convertToWord(
    user
  )}${smallUWord} beats ${convertToWord(comp)}${smallCWord}. You win!`;

  user_div.classList.add("success-glow");

  setTimeout(() => user_div.classList.remove("success-glow"), 300);
}

function lose(user, comp) {
  const smallUWord = "user".fontsize(3).sup();
  const smallCWord = "comp".fontsize(3).sup();
  const user_div = document.getElementById(user);

  computerScore++;
  userScore_span.innerHTML = userScore;
  compScore_span.innerHTML = computerScore;

  result_p.innerHTML = `${convertToWord(
    user
  )}${smallUWord} loses to ${convertToWord(comp)}${smallCWord}. You lost!`;

  user_div.classList.add("danger-glow");

  setTimeout(() => user_div.classList.remove("danger-glow"), 300);
}

function draw(user, comp) {
  const smallUWord = "user".fontsize(3).sup();
  const smallCWord = "comp".fontsize(3).sup();
  const user_div = document.getElementById(user);

  result_p.innerHTML = `${convertToWord(
    user
  )}${smallUWord} equals ${convertToWord(comp)}${smallCWord}. It's a draw!"`;

  user_div.classList.add("draw-glow");

  setTimeout(() => user_div.classList.remove("draw-glow"), 300);
}

function game(userChoice) {

  const compChoice = getCompChoice();
  switch (userChoice + compChoice) {
    case "rs":
    case "pr":
    case "sp":

      win(userChoice, compChoice);
      break;

    case "rp":
    case "ps":
    case "sr":

      lose(userChoice, compChoice);
      break;

    case "rr":
    case "pp":
    case "ss":
      draw(userChoice, compChoice);
      break;
  }
  finalResult();
}

function main() {
  rock_div.addEventListener("click", () => game("r"));

  paper_div.addEventListener("click", () => game("p"));

  scissors_div.addEventListener("click", () => game("s"));
}

main();

function finalResult() {
  remaining_time.innerHTML = timeleft;
  userScore_span.innerHTML = userScore;
  compScore_span.innerHTML = computerScore;

  if (timeleft === '00:00' && userScore > computerScore) {

    Swal.fire({
      imageUrl: "/images/trophy.gif",
      imageHeight: 200,
      imageWidth: 200,
      title: "congratulations!!!",
      text: "you have won",
      timer: 10000,
      showConfirmButton: false,
    }).then(() => location.reload());

  } else if (timeleft == '00:00' && computerScore > userScore) {

    Swal.fire({
      imageUrl: "/images/sorry.gif",
      imageHeight: 200,
      imageWidth: 200,
      title: "sorry!",
      text: "you have lost",
      timer: 10000,
      showConfirmButton: false,
    }).then(() => location.reload());

  }
}


function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

function setTimer() {
  var twoMinutes = 60 * 1,
    display = document.querySelector('#time');
  startTimer(twoMinutes, display);
}

window.onload = function () {
  hideGameArea();
};
function startgame() {
  showGameArea();
  setTimer();
}
function hideGameArea() {
  var x = document.getElementById("gamearea");
  x.style.display = "none"
}
function showGameArea() {
  var x = document.getElementById("gamearea");
  x.style.display = "block";
}







