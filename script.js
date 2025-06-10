let sizeY = 125;
let sizeX = 2*sizeY;
let speed = 100;
let EMPTY = 0;
let ALIVE = 1;
let htmlElements, cells;

function createField() {
   htmlElements = [];
   cells = [];

   let table = document.getElementById('field');

   for (let y = 0; y < sizeY; y++) {
      let tr = document.createElement('tr');
      let tdElements = [];
      cells.push(new Array(sizeY).fill(EMPTY));
      htmlElements.push(tdElements);
      table.appendChild(tr);

      for (let x = 0; x < sizeX; x++) {
         let td = document.createElement('td');
         tdElements.push(td);
         tr.appendChild(td);
      }
   }
}

function countNeighbors(x, y) {
   let count = 0;
   for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
         let nx = (x + dx + sizeX) % sizeX;
         let ny = (y + dy + sizeY) % sizeY;
         count += cells[ny][nx];
      }
   }
   return count - cells[y][x];
}

function newGeneration() {
   let newCells = [];

   // Initialisation des cellules la prochaine génération à EMPTY
   for (let i = 0; i < sizeY; i++) {
      newCells.push(new Array(sizeX).fill(EMPTY))
   }

   // Remplissage des cellules de la prochaine génération
   for (let y = 0; y < sizeY; y++) {
      for (let x = 0; x < sizeX; x++) {
         let neighbors = countNeighbors(x, y);

         // Si cellule courante est vide et a 3 voisins
         if (cells[y][x] == EMPTY && neighbors == 3) {
            newCells[y][x] = ALIVE;
         }

         // Si cellule courante est vivante et a 2 ou 3 voisins, reste vivante
         if (cells[y][x] == ALIVE && (neighbors == 2 || neighbors == 3)) {
            newCells[y][x] = ALIVE;
         }

         // Naissance aléatoire de la cellule (0.0002% de chance) (saut quantique)
         if (Math.random() < 0.000002 && cells[y][x] == EMPTY) {
            newCells[y][x] = ALIVE;
         }

         // // Naissance aléatoire d'un organisme (0.00001% de chance)
         if (Math.random() < 0.0000004) {
            let i = 0;
            let iter = 0;
            while (i < 3 && iter < 50) {
               for (let dy = -1; dy <= 1; dy++) {
                  for (let dx = -1; dx <= 1; dx++) {
                     iter++;
                     let nx = (x + dx + sizeX) % sizeX;
                     let ny = (y + dy + sizeY) % sizeY;
                     if (cells[ny][nx] == EMPTY && Math.random() < 0.2) {
                        newCells[ny][nx] = ALIVE;
                        i++;
                     }
                  }
               }
            }
         }
      }
   }

   // Actualisation des cellules 
   cells = newCells;
   draw();
}

function draw() {
   for (let y = 0; y < sizeY; y++) {
      for (let x = 0; x < sizeX; x++) {
         htmlElements[y][x].setAttribute('class', 'cell ' + (cells[y][x] == ALIVE ? 'alive' : 'empty'));
      }
   }
}

function init() {
   // Création de la structure du tableau dans le DOM
   createField();

   // Initialisation du jeu
   for (let i = 0; i < Math.floor(sizeY * sizeX * 0); i++) {
      while(true) {
         let x = Math.floor(Math.random() * sizeX);
         let y = Math.floor(Math.random() * sizeY);
         if (cells[y][x] == EMPTY) {
            cells[y][x] = ALIVE;
            break;
         }
      }
   }

   // Edition du tableau pour afficher les cellules vides et vivantes
   draw();

   // Lancement de la partie
   setInterval(newGeneration, 100 / speed);
}

init();