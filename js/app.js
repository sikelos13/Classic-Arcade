// Enemies our player must avoid
var Enemy = function(k, speed) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = -100;
  this.y = 60 + (k - 1) * 80;
  this.speed = speed;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};
let score = 0;
let counter = document.querySelector(".score");
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.speed * dt;
  // if x cordinates position is out of canva the make bug to go back at start off screen
  if (this.x > 500) {
    this.x = -100;
  }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
  this.x = 200;
  this.y = 380;

  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  //calling collision method
  this.checkCollisions();
  //If pass to the river then player wins and game resets
  if (this.y < 0) {
    if (score < 10) {
      this.reset();
      score++;
      counter.innerHTML = score;
      //If score is 10 then reset and alert player that he won.
    } else if (score === 10) {
      this.reset();
      score = 0;
      counter.innerHTML = score;
      alert("You Won!");
    }
  }
  //use x and y that got from Handle Input.
  this.x = this.x;
  this.y = this.y;

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/*Handle method when the keys pressed we add or delete
specific width of x and y coordinates*/
Player.prototype.handleInput = function(key) {
  if (key === 'left' && this.x > 0) {
    this.x = this.x - 100;
  } else if (key === 'right' && this.x < 400) {
    this.x = this.x + 100;
  } else if (key === 'up' && this.y > 0) {
    this.y = this.y - 80;
  } else if (key === 'down' && this.y < 380) {
    this.y = this.y + 80;
  }
}
//Reset the game and reset players position.
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 380;

}
//check collision
Player.prototype.checkCollisions = function() {
  const len = allEnemies.length;
  for (let i = 0; i < len; i++) {
    if ((allEnemies[i].x) <= this.x + 30 && (allEnemies[i].x + 30) >= (this.x) && (allEnemies[i].y) <= this.y + 30 && (allEnemies[i].y + 30) >= (this.y)) {
      score = 0;
      counter.innerHTML = score;
      this.reset();
    }
  }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

const allEnemies = [];

for (let i = 0; i < 7; i++) {
  //random speed of the bug and random row that will be putted
  let enemy_speed = Math.floor((Math.random() * 150) + 100);
  let enemy_row = Math.floor((Math.random() * 3) + 1);
  allEnemies[i] = new Enemy(enemy_row, enemy_speed);
}

// Place the player object in a variable called player
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
