// This is just a regular function, but we capitalize it by convention
function Hero(name, level) {
  // 'this' refers to the new object being created
  this.name = name;
  this.level = level;
}

// We add methods to the "Prototype" so they aren't recreated for every object
Hero.prototype.greet = function() {
  console.log("Hello, I am " + this.name);
};

// You use the 'new' keyword to call the function
const link = new Hero("Link", 10);
link.greet(); 
