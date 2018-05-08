let fs = require("fs");

let nutrientes = new Array;

let foods = new Array;
let foodPosition = new Array;
let nutrientesP = new Array;
try {  
    let data = fs.readFileSync('db.txt', 'utf8');
    let rows = data.split("\n");
    let c = rows[0].split(",");
    for(let i = 0;i < c.length; i++){
        nutrientes[i] = c[i];
        nutrientesP[c[i]] = i; 
    }

    //// read alimentos

    for(let i = 2; i < rows.length; i++){
        let food = new Object();
        c = rows[i].split(",");
        food.name = c[0];
        food.vitamins = new Array;
        foodPosition[food.name] = i;
        for(let j = 1; j < c.length - 1; j++){
            food.vitamins[j-1] = c[j];
        }
        foods[i-2] = new Object(food);
    }
    

} catch(e) {
    console.log('Error:', e.stack);
}

function checker(){
    let wantedFood = arguments[0];
    let vitaminsNeeded = arguments[1];
    let values = new Array;
    let vitaminsMatrix = new Array;
    let linSystem = require("linear-equation-system");
    for(let i = 0; i < vitaminsNeeded.length; i++){
        values[i] = new Array;
    }
    for(let i = 0; i < foods.length;i++){
        
        let actual = new Object(foods[i]);
        let vit = actual.vitamins;
        for(let j = 0;j < vit.length; j++){
            values[j][i] = vit[j];
        }
        
    }
    for(let i = values[0].length;i < vitaminsNeeded.length;i++){
        for(let j = 0; j < values.length;j++){
            values[j][i] = 0.0;
        }
    }
    console.log(values);
    let solution = linSystem.solve(values, vitaminsNeeded);

    return  solution;
}

let vitaminsWanted = [33.9,1,0,6,0.8,0.18,0.03,0.4,0.05,1,110,0,160,11,44,90,17,2.9,0.4];
let foodWanted = ["Yogur bulgaro","Arroz con leche"];
var linSystem = require("linear-equation-system");
 
var A =[[0,-1,1],
    [-1,3,0],
    [2,0,6]];
 
var B = [2,5,20];
 
console.log(linSystem.solve(A, B));
console.log(checker(foodWanted, vitaminsWanted));0