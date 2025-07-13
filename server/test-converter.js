// Test script to check if the converter logic works
const { convertCode } = require('./routes/converter');

// Test conversion
const jsCode = `function hello() {
    console.log("Hello World");
    let name = "JavaScript";
    return name;
}`;

console.log("Original JavaScript code:");
console.log(jsCode);
console.log("\nConverted to Python:");
console.log(convertCode(jsCode, 'javascript', 'python'));
