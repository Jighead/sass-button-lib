// example import
import jquery from "./js/lib/jquery";
window.jQuery = jquery; // set global so we can use as normal
window.$ = jquery; // set global so we can use as normal
import ExampleClass from "./js/classes/ExampleClass";
import  "./js/components/ihavenoclass";
import { Navbar } from "./js/components/navbar";
import { Footer } from "./js/components/footer";

// block scope
let bob = new ExampleClass();
bob.sayHello();

// jquery stuff
$('#comp-navbar').append(Navbar.render);
$('#head').html("<h1>Injectied via jQuery</h1><h3>See the app.js file.</h3><p>If you view the source you wont see the html output for this section. Just an empty div.</p>");
$('#comp-footer').append(Footer.render);

$('.nav').on('click', 'li a', function(){
  alert('Link click works!');
}); 
