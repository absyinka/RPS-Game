var userScore = 0;
var computerScore = 0;
const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("comp-score");
const scoreBoard_div = document.querySelector(".scoreboard");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
const remaining_time = document.getElementById("time");
const gamearea_div = document.getElementById("gamearea");
const start_btn = document.getElementById("start");
const user_span = document.getElementById("user");
const userName_span = document.getElementById("userName");
const modal = document.getElementById("myModal");


window.onload = () => hideGameArea();

// When the user clicks on the button, open the modal
start_btn.onclick = function () {
  modal.style.display = "block";
}

function setTimer() {
  var timeleft = 10;
  var downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      remaining_time.innerHTML = "Finished";
    } else {
      remaining_time.innerHTML = timeleft + " seconds remaining";
    }
    timeleft -= 1;
  }, 1000);
}

function startgame() {
  if (userName_span.value === "") {
    user_span;
  } else {
    user_span.innerHTML = userName_span.value;
  }

  showGameArea();
  setTimer();
  modal.style.display = "none";
  start_btn.style.display = "none";
}

function hideGameArea() {
  gamearea_div.style.display = "none";
}

function showGameArea() {
  gamearea_div.style.display = "block";
}

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
  const smallUWord = userName_span.value.fontsize(3).sup();
  const smallCWord = "comp".fontsize(3).sup();
  const user_div = document.getElementById(user);

  if (remaining_time.innerHTML === "Finished") {
    userScore;
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = computerScore;
  } else {
    userScore++;
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = computerScore;
  }
  
  result_p.innerHTML = `${convertToWord(
    user
  )}${smallUWord} beats ${convertToWord(comp)}${smallCWord}. You win!`;

  user_div.classList.add("success-glow");

  setTimeout(() => user_div.classList.remove("success-glow"), 300);
  
}

function lose(user, comp) {
  const smallUWord = userName_span.value.fontsize(3).sup();
  const smallCWord = "comp".fontsize(3).sup();
  const user_div = document.getElementById(user);
  
  if (remaining_time.innerHTML === "Finished") {
    computerScore;
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = computerScore;
  } else {
    computerScore++;
    userScore_span.innerHTML = userScore;
    compScore_span.innerHTML = computerScore;
  }

  result_p.innerHTML = `${convertToWord(
    user
  )}${smallUWord} loses to ${convertToWord(comp)}${smallCWord}. You lost!`;

  user_div.classList.add("danger-glow");

  setTimeout(() => user_div.classList.remove("danger-glow"), 300);  
}

function draw(user, comp) {
  const smallUWord = userName_span.value.fontsize(3).sup();
  const smallCWord = "comp".fontsize(3).sup();
  const user_div = document.getElementById(user);

  result_p.innerHTML = `${convertToWord(
    user
  )}${smallUWord} equals ${convertToWord(comp)}${smallCWord}. It's a draw!`;

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

main();


function main() {
  rock_div.addEventListener("click", () => game("r"));

  paper_div.addEventListener("click", () => game("p"));

  scissors_div.addEventListener("click", () => game("s"));
}

function finalResult() {
  let timeleft = remaining_time.innerHTML;
  userScore_span.innerHTML = userScore;
  compScore_span.innerHTML = computerScore;

  if (timeleft === "Finished" && userScore > computerScore) {
    Swal.fire({
      imageUrl: "/images/trophy.gif",
      imageHeight: 200,
      imageWidth: 200,
      title: "Congratulations!!!",
      html: "<b>You won: </b>The scores is: " + userScore + ":" + computerScore,
      timer: 10000,
      showConfirmButton: false,
    }).then(() => location.reload());
  } else if (timeleft === "Finished" && userScore < computerScore) {
    Swal.fire({
      imageUrl: "/images/sorry.gif",
      imageHeight: 200,
      imageWidth: 200,
      title: "Sorry!",
      html:
        "<b>You lose: </b>The scores is: " + userScore + ":" + computerScore,
      timer: 10000,
      showConfirmButton: false,
    }).then(() => location.reload());
  } else if (timeleft === "Finished" && userScore == computerScore) {
    Swal.fire({
      imageUrl: "/images/thumbs.gif",
      imageHeight: 200,
      imageWidth: 200,
      title: "Welldone!",
      html:
        "<b>It's a draw: </b>The scores is: " + userScore + ":" + computerScore,
      timer: 10000,
      showConfirmButton: false,
    }).then(() => location.reload());
  }
}