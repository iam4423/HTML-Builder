# HTML BUILDER 

## The Problem 
Im sick of using pure HTML strings in my javascript, its ugly and can be hard to follow.\
I have looked at a few other solutions for this but im just not happy with any of them for a verity  of reasons.

## The Solution 
I have created a very simple Js module to allow me to build my HTML programatically, its not a perfect solution but its the best one ive got.


## Usage 

###### Include the file
*Note* This is only designed to work in a browser, it will not work in a NodeJS environment... yet
```
<script src="[path to JsML.js]"></script>
```

###### Default Usage
```
var builder = JsML.HTML("[tag type]", {dictionary: "of", tag: "properties"}, "Content");
```

###### Create self closing tags
```
// by ommiting the final parameter a self closing tag will be crated
var builder = JsML.HTML("img", {src: "[some path]", alt: "image name"});
```

###### Create empty element
```
// to create an element with no conetnet pass an emty string as the third parameter
var builder = JsML.HTML("div", {class: "some-class"}, "");
```

###### Nested element
```
/*
   The third parameter or 'content' parameter accepts the following types of input
     - Strings
     - Numbers 
     - Booleans
     - HTMLBuilder instances (returned by the JsML.HTML method)
     - Arrays of any of the above types
     - Closures returning any of the above types
   
   You can use this to create nested and more complicated HTML strings
*/
var builder = JsML.HTML("div" {class: "parent"}, [
  JsML.HTML("div", {class: "child"}, "Child 1"),
  '<div class="child">Child 2</div>',
  JsML.HTML("ul", {class: "child"}, [
    JsML.HTML("li", {}, "Item 1"),
    JsML.HTML("li", {}, "Item 2")
  ])
])
```

###### Simplify the code
```
/*
   To prevent poluting the global namespace HTML is a member of the JsML object but this does make the 
   code a lot less neat than it could be.
   
   If you do ot have any conflicting objects you can injext the HTML function into the global namespace.
   
   Here is a repeat of the previous example when this is applied
*/

JsML.populateGlobal();
var builder = HTML("div" {class: "parent"}, [
  HTML("div", {class: "child"}, "Child 1"),
  '<div class="child">Child 2</div>',
  HTML("ul", {class: "child"}, [
    HTML("li", {}, "Item 1"),
    HTML("li", {}, "Item 2")
  ])
])
```

###### Update the builder after instantiation
```
/*
   Once the builder is defined you can then update its contents before output
   Currently this can only be done to the content of the tags themselves
*/

var builder = JsML.HTML("div", {}, "");

builder.append("") // append content to the element (suppoerts the same types as on instantiation)
builder.prepend("") // prepend content to the element (suppoerts the same types as on instantiation)
builder.html("") // replace content of the element (suppoerts the same types as on instantiation)
```

###### Get the final string
```
// Once you have build you HTML you then need to be able to return it in a useful type, this is simple

var builder = JsML.HTML("div", {class: "example-div"}, "Example Content");
var htmlString = builder.asString();

// Elements can also be returned as a pure JS object or a jQuery object
var pure = builder.asJsObject();
var jq   = builder.asJQueryObject();
```



## Feedback
please feel free to suggest improvements or point out where im being stupid in the issues section