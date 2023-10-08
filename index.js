
 const game = {
    players: [0, 0], //store player scores
    currentPlayerIndex: 0, // Index of the current player
    playersName: ["Alaa" , "Ali"],
    currentRoundScore: 0, // Score for the current round
    winningScore: 100, 
    isGameActive: false, 
  
    init() {
     
    const header = document.querySelector("header");
    const playerSec = document.createElement("section");
    const firstPlayerName = document.createElement("h1");
    firstPlayerName.innerText = this.playersName[0];

    playerSec.style.display = "flex";
    playerSec.style.flexDirection = "column";
    playerSec.style.justifyContent = "space-around" ;
    playerSec.style.alignItems = "center";

    const crownIcon = document.createElement("i");
    crownIcon.className ="fa-solid fa-crown";
    crownIcon.id = "firstPlayerTurn";
    crownIcon.style.color = "red";
  

    const printScore1Player = document.createElement("span");
    printScore1Player.id="score1";
    printScore1Player.innerText = 0;

  
    playerSec.appendChild(crownIcon);
    playerSec.appendChild(firstPlayerName);
    playerSec.appendChild(printScore1Player);

    header.appendChild(playerSec);



    const targetSection = document.createElement("h2");
    targetSection.innerHTML = this.winningScore;
    targetSection.style.border = "1px solid red";
    targetSection.style.borderRadius = "60%";
    targetSection.style.padding = "10px 10px";
    header.appendChild(targetSection);

    const playerSec2 = document.createElement("section");
    const secondPlayerName = document.createElement("h1");
    secondPlayerName.innerText = this.playersName[1];
    playerSec2.style.display = "flex";
    playerSec2.style.flexDirection = "column";
    playerSec2.style.justifyContent = "space-around" ;
    playerSec2.style.alignItems = "center";
    const crownIcon2 = document.createElement("i");
    crownIcon2.className ="fa-solid fa-crown";
    crownIcon2.style.color = "red";
    crownIcon2.id = "secPlayerTurn";
    crownIcon2.style.opacity = "0";
    const printScore2Player = document.createElement("span");
    printScore2Player.innerHTML = 0;
    printScore2Player.id = "score2";
     

    playerSec2.appendChild(crownIcon2);
    playerSec2.appendChild(secondPlayerName);
    playerSec2.appendChild(printScore2Player); 

    header.appendChild(playerSec2);


    header.style.display = "flex";
    header.style.width = "100%";
    header.style.justifyContent = "space-evenly";
    header.style.alignItems = "center";


      const firstDice = document.createElement("img");
      firstDice.id= "firstDice";
      firstDice.alt ="dice";
      firstDice.src = "assets/img/dice-1.png"
      const secondDice =document.createElement("img");
      secondDice.id ="secondDice";
      secondDice.alt ="dice";
      secondDice.src = "assets/img/dice-1.png"
      document.getElementById("dice").appendChild(firstDice);
      document.getElementById("dice").appendChild(secondDice);
      
     
  
      const score = document.createElement("h1");
      score.innerHTML = 0;
      score.id = "score";
      document.getElementById("currScore").appendChild(score);

      this.startNewGame();
    },
  
    startNewGame() {
      // Reset player scores, current round score, and game state
      this.players[0] = 0;
      this.players[1] = 0;
      this.currentRoundScore = 0;
      this.currentPlayerIndex = 0;
      this.isGameActive = true;
  
    },
  
    rollDice() {
      if (!this.isGameActive) return; // Check if the game is active
      this.DiceAnimation("firstDice");
      this.DiceAnimation("secondDice");
  
      const random = this.choose2RandomNums();
      const total = random["firstAttempt"] + random["secondAttempt"];
      console.log("total is ", total);
      const firstDice = document.getElementById("firstDice");
      firstDice.src = `assets/img/dice-${random["firstAttempt"]}.png`;
      const secondDice = document.getElementById("secondDice");
      secondDice.src = `assets/img/dice-${random["secondAttempt"]}.png`;
      this.totalCurrentScore(total);
    },
    
    DiceAnimation(id){
        const dice = document.querySelector(`#${id}`);
        // Randomize the rotation values for a rolling effect
        const xRotation = Math.floor(Math.random() * 3 + 1) * 360; // 0, 360, 720, or 1080 degrees
        const yRotation = Math.floor(Math.random() * 3 + 1) * 360;
        const zRotation = Math.floor(Math.random() * 3 + 1) * 360;
      
        // Apply the rotations
        dice.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg) rotateZ(${zRotation}deg)`;
      
        // After a delay, reset the rotation to the initial state
        setTimeout(() => {
          dice.style.transform = 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)';
        }, 1000); // Adjust the delay as needed (2 seconds in this example)
    },
    hold() {
      if (!this.isGameActive) return; // Check if the game is active
  
      this.players[this.currentPlayerIndex] += this.currentRoundScore;
      if(this.isGameOver()){
        console.log("you lost!")
        this.startNewGame();
      }
      this.currentRoundScore = 0;
      this.switchPlayer();
    },
  
    switchPlayer() {
      if (!this.isGameActive) return; // Check if the game is active
  
      this.currentPlayerIndex = 1 - this.currentPlayerIndex;
      if(this.currentPlayerIndex == 0){
        document.getElementById("secPlayerTurn").style.opacity = "0";
        document.getElementById("firstPlayerTurn").style.opacity = "1";
       
      }
      else{
        document.getElementById("firstPlayerTurn").style.opacity = "0";
        document.getElementById("secPlayerTurn").style.opacity = "1";
      }
     
      this.chooseRandomDic();

    },
  
    isGameOver() {
      // Check if the game is over based on winning conditions
      return this.players.some(score => score >= this.winningScore);
    },
  
    updateDOM() {
      // Update the game's display in the DOM 
      document.getElementById("score").innerText =  this.currentRoundScore;
      document.getElementById("score1").innerText = this.players[0];

      document.getElementById("score2").innerText = this.players[1];
    },
  
    totalCurrentScore(total) {
      if (total == 12) {
        this.currentRoundScore = 0;
      
            
   
    document.querySelector("#game-container").style.display = "none";
    const gif = document.createElement("div");
    gif.style.width = "width:480px";
    gif.style.display = "flex";
    gif.style.alignItems = "center";
    gif.style.justifyContent = "center";
    gif.innerHTML = `<iframe src="https://giphy.com/embed/sKBaE2Hl60KnzjTVXb" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`;
    document.querySelector("body").appendChild(gif);

    console.log("opss");

         setTimeout(() => {
            document.querySelector("#game-container").style.display = "block";
            document.querySelector("body").removeChild(gif);
          }, 4000); 
        this.switchPlayer();
      } else {
        this.currentRoundScore += total;
        this.updateDOM(); // Update the display
      }
    },
  
    chooseRandomDic() {
   
      const random = this.choose2RandomNums();
      const total = random["firstAttempt"] + random["secondAttempt"];
      console.log("total is ", total);
      const firstDice = document.getElementById("firstDice");
      firstDice.src = `assets/img/dice-${random["firstAttempt"]}.png`;
      const secondDice = document.getElementById("secondDice");
      secondDice.src = `assets/img/dice-${random["secondAttempt"]}.png`;
      this.totalCurrentScore(total);
    },
  
    choose2RandomNums() {
      return {
        "firstAttempt": Math.floor(Math.random() * 2) + 5,
        "secondAttempt": Math.floor(Math.random() * 2) + 5,
      };
    },
  };

  // Initialize the game
  

  document.getElementById("startGame").addEventListener("click", () => {
    game.init();
    const restartIcon = document.createElement("i");
    restartIcon.className ="fa fa-refresh";
    restartIcon.style.color = "#EB4D4D";
    restartIcon.style.fontSize = "25px";
    document.getElementById("startGame").style.border = "none";
    document.getElementById("startGame").style.display = "inline-block";
    document.getElementById("startGame").justifyContent = "center";
    document.getElementById("startGame").alignItems = "center";
    document.getElementById("startGame").innerText = "";
    // <i class="" aria-hidden="true"></i>
    document.getElementById("startGame").appendChild(restartIcon);
    // Show the "Roll" and "Hold" buttons
    document.getElementById("roll").style.display = "inline-block";
    document.getElementById("hold").style.display = "inline-block";
  });

  
  document.getElementById("roll").addEventListener("click", () => {
    game.rollDice();
  });
  
  document.getElementById("hold").addEventListener("click", () => {
    game.hold();
  });


  


  
  


