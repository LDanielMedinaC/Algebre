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
        foods[i] = food;
    }
    

} catch(e) {
    console.log('Error:', e.stack);
}

