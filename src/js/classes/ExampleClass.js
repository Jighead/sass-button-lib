//var $ = require('path/to/jquery');

export default class ExampleClass {
	constructor () {
		this.hello = "Hello There! I'm coming from ./js/classes/example-class.js";
	}
	sayHello () {
		console.log(this.hello);
	}
}