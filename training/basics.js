const person = {
    name: 'Brew',
    age: 27
}

//object destructuring

let printName = ({name})=>{
    console.log("name:",name);
}

printName(person);
//similarly
const {name,age} = person;
console.log(name,age);

// array destructuring

const something = ['hello','world'];
const [part1,part2] = something;
console.log(part1,part2);

const [...items] = something; //array destructuring using spread '...' operator
console.log(...items);

const arr = [...something]; //spread '...' operator to copy array elements
console.log(arr);

let func = ([...args]) => { //rest '...' operator with array destructuring to accept arguments passed to a function
    return args;            // '...' the operator is called rest or spread depending on where it is used.
}                           //In function parameter its called rest, in array copying its called spread
console.log(func(arr));

