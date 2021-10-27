let count = 0;
const pacMen = []; 

// Return an object with random properties x and y between two values
const randomXY = (high, low) => ({
    'x' : Math.random() * (high - low) + low,
    'y' : Math.random() * (high - low) + low
  })

// Make a PacMan at a random position with random velocity
function makePac() {
  let velocity = randomXY(2,10); 
  let position = randomXY(0,Math.min(window.innerWidth-140,window.innerHeight-140));
  // Add image to 'game'
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.style.zIndex = pacMen.length;
  newimg.src = './images/PacMan1.png';
  newimg.style.transform = 'none';
  newimg.width = 100;
  // Set position
  newimg.style.left = position.x;
  newimg.style.top = position.y;
  game.appendChild(newimg);
  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

// Update the positions of all pacMen
function update() {
  count++;
  pacMen.forEach(item => {
    checkCollisions(item);

    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;

    if (count === 15) {
      item.newimg.src = item.newimg.src.includes('PacMan1.png') ? 
                        './images/PacMan2.png' : './images/PacMan1.png'  
    }
  });
  if (count === 15) count = 0
  setTimeout(update, 30)
}

// Check collisions and reverse direction
function checkCollisions(item) {
  if (item.position.x <= 0 || item.position.x >= (window.innerWidth - item.newimg.width - 40)) {
    item.velocity.x = -item.velocity.x;
    // switch image direction
    let transform = item.newimg.style.transform;
    item.newimg.style.transform = transform.includes('180deg') ? 'none' : 'rotateY(180deg)'
  }
  if (item.position.y <= 0 || item.position.y >= (window.innerHeight - item.newimg.height - 40)) {
      item.velocity.y = -item.velocity.y;
  }
}

// Make a pacMan
const makeOne = () => pacMen.push(makePac())