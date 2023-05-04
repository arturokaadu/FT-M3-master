function* fizzBuzzGenerator(max) {
  // Tu código acá:
 var num = 1
 let limit = max || Infinity
 while ( num <= limit){

   if (num % 3 === 0 && num % 5 === 0){
    yield 'Fizz Buzz'
   } else if (num % 3 === 0){
    yield 'Fizz'
   } else if (num % 5 === 0){
     yield 'Buzz'
   } else yield num
    num++   
 }
}

module.exports = fizzBuzzGenerator;
