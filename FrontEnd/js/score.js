/**
 * Fetch the data from the API.
 * And render out the score data in the score screen display.
 */
window.onload = async () => {
  const response = await fetch("https://Final-Project-BackEnd-API.shashanks7s7.repl.co/get", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  score = await response.json();
  scorecontent = score.map((score) => {
    return `<article class="score-item">
  
  <h4>${score.playerName}</h4>
  <p>Win: ${score.wins}</p>
  <p>Consecutive Win: ${score.wins}</p>
  <br>
  <hr>
  <br>
  </article>
  `;
  });
  scorecontent = scorecontent.join("");
};
submitBtn.addEventListener("click", submitAction);
function submitAction() {
  if (nameInput.value == "") {
    return;
  }
  localStorage.setItem("playerName", nameInput.value);

  gameMenu.style.display = "block";
  document.getElementById("login").style.display="none"
}

scorebutn.addEventListener("click", function (e) {
  gameMenu.style.display = "none";
  scoreScreen.style.display = "block";
  scoreExit.style.display = "block";
  scoreScreen.innerHTML = scorecontent;
  e.stopPropagation();
});
scoreExit.addEventListener("click", function (e) {
  gameMenu.style.display = "block";
  scoreScreen.style.width = "40%";
  scoreScreen.style.display = "none";
  scoreExit.style.display = "none";
  e.stopPropagation();
});
waystoPlayButn.addEventListener("click", function (e) {
  gameMenu.style.display = "none";
  scoreScreen.style.display = "block";
  scoreExit.style.display = "block";
  scoreScreen.style.width = "80%";
  scoreScreen.innerHTML = `<article class="score-item">
  <h1>Instructions</h1><br>
  <br>
  <p>Press Left Mouse Button to draw Stick.</p>
  <br>
  <p>You can press anywhere on the screen to draw Stick.</p>
  <br>
  <p>Release the Left Mouse Button to shoot the cue.</p>
  </article>
  `;
  e.stopPropagation();
});
