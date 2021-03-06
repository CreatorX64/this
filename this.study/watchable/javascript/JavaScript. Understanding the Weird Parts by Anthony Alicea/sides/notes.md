# Course Notes

## Section 2 - Execution Contexts and Lexical Environments

**Syntax Parser**: A program that reads your code and determines what it does and if its grammar is valid.

**Lexical Environment**: Where something sits physically in the code you write. **Lexical** means _having to do with words and grammar_. A lexical environment exists in programming languages in which _where_ you write something is important.

**Execution Context**: A wrapper to help manage the code that is running. There are lots of lexical environments. Which one is currently running is managed via execution contexts. It can contain things beyond what you've written in your code.

**Name/Value Pair**: A name which maps to a unique value. The name may be defined more than once, but only can have one value in any given _execution context_ (which is a section of code that is running). That value may be more name/value pairs.

**Object**: A collection of name/value pairs. That's the simplest definition of an object when talking about JavaScript. That's because at its core, objects are literally nothing more than name/value pairs in JavaScript.

**Global**: In JavaScript, global means _not inside a function_. Simple as that.

**Single Thread**: This basically means one command is executed at a time. Under the hood of the browser, this may not be the case. But from our perspective as programmers, JavaScript behaves in a single threaded manner.

**Synchronous**: This is very similar to _single threaded_. In the context of programming, synchronous means _one at a time, in order_. One line of code being executed, for synchronous execution, at a time, in order.

**Invocation**: Running a function. In JavaScript, by using parenthesis. Every function invocation creates a new execution context that's placed on top of the **execution stack**. Then, inside that execution context, JavaScript engine goes through the first phase of creating an execution context (the _creation phase_) where it sets up a **this** keyword, sets up an **arguments** keyword, creates a reference to the outer (lexical) environment for **scope chain**, and it goes through the process of **hoisting** (during hoisting, memory space is allocated for variables [which hold _undefined_ for variables defined using _var_, but variables declared using _let_ or _const_ aren't given any value], and memory space which holds the functions themselves is allocated for functions definded as a function statement), after which the engine proceeds to the second phase of execution context: _Execution phase_.

**Variable Environment**: Where the variables live and how they relate to each other in memory. Every execution context has its own variable environment. For instance, the global execution context's variable environment is the global object, or **window** object in the browser.

**Scope**: Where a variable is available in your code. Variables that are created using the **var** keyword have a **function scope** (meaning that they are only available inside the function [or *execution context*] that they were created in), whereas variables created using the **let** keyword have a **block scope** (meaning that they are only available inside the physical [or lexical] block in which they're defined in). Definition of _scope_ taken from MDN: The current context of execution. The context in which values and expressions are "visible" or can be referenced. If a variable or other expression is not "in the current scope", then it is unavailable for use. Scopes can also be layered in a hierarchy, so that child scopes have access to parent scopes, but not vice versa.

**Scope Chain**: A term used to describe the connection between an execution context, its outer (lexical) environment reference, and that outer environment's outer environment reference, and so on until the global lexical environment is reached. Definition of _scope chain_ taken from StackOverflow: "The scope chain is used to resolve the value of variable names in javascript. Without a scope chain the Javascript engine wouldn't know which value to pick for a certain variable name if there are multiple defined at different scopes."

**Asynchronous**: In the context of programming, this simply means _more than one at a time_. Note that JavaScript is synchronous, meaning that the JavaScript engine executes code one line at a time. However, the environment in which the JavaScript engine exists, for instance the browser, can have other pieces and modules of code that can handle other tasks (like making HTTP requests or painting the UI). JavaScript engine has hooks through which it can work with these other parts of the browser. In addition, aside from the execution stack, the JavaScript engine keeps another list called **event queue**. When an event happens in the browser (like a click, HTTP request being ready, page load, and so on), the browser puts information about that event in the JavaScript engine's event queue. Then, once the JavaScript engine's execution stack is empty, the engine checks its event queue and then runs the handler functions for the events in order, if any. Then when the execution stack is empty again, the engine checks the event queue again (this continuous process of checking the event queue is called the **event loop**). That's why JavaScript seems asynchronous, but the JavaScript engine itself does all of these things synchronously. In truth, the browser is the one that's asynchrounously running a lot of parts at the same time. So again, asynchronous processes are possible in JavaScript but the asynchronous part is really about what's happening _outside_ of the JavaScript engine.

## Section 3 - Types and Operators

**Dynamic Typing**: You don't tell the engine what type of data a variable holds, it figures it out while your code is running. Variables can hold different types of values because it's all figured out during execution.

**Static Typing**: You tell the engine (or compiler, interpreter) ahead of time what kind of data you intend to hold inside a variable.

**Primitive Type**: A type of data that represents a single value. That is, not an object. In JavaScript there are 7 primitive types:

- **undefined**: Represents lack of existence. You shouldn't set a variable to this.
- **null**: Represents lack of existence. You can set a variable to this.
- **boolean**: _true_ or _false_.
- **number**: _Floating point_ number (there's always some decimals). Unlike other programming languages, there's only one _number_ type, and it's a floating point number.
- **bigint**: A numeric data type that can represent integers in the _arbitrary precision format_.
- **string**: A sequence of characters.
- **symbol**: Used in ES6. A value that's guaranteed to be unique.

**Operator**: A special function that is syntactically (written) different. Generally, operators take two parameters and return one result. In JavaScript, operators are special types of functions that the operands are being passed as arguments and a value is being returned. Inside those functions, there's pre-built logic written for you that the JavaScript engine provides. This logic inside these special functions are especially important for dynamically typed languages like JavaScript, because it basically decides what happens when the function (the operator) is passed in a value of a certain type.

**Operator Precedence**: Rules that govern which operator function gets called first. Functions are called in order of precendence (higher precedence wins).

**Associativity**: What order operator functions get called in when functions have the _same_ precendence: Left-to-right (_left associative_) or right-to-left (_right associative_). Associativity, along with operator precedence, is important in JavaScript because JavaScript is dynamically typed.

**Coercion**: Converting a value from one type to another. This happens quite often in JavaScript because it's dynamically typed. We know that operators are specials functions that run some logic, so part of that logic is coercion. It is a fundamental part of the JavaScript language.

## Section 4 - Objects and Functions

**Namespace**: In modern coding, a _namespace_ is a container for variables and functions. It is used typically to keep variables and functions with the same name separate, to keep them in different _spaces_ defined by different _names_. JavaScript doesn't have the concept of a namespace, but because of the nature of objects in JavaScript, we don't need namespaces as a feature. We can fake it.

**First Class Functions**: In a programming language that has _first class functions_ (like JavaScript), everything you can do with other types you can do with functions. Assign them to variables, pass them around, create them on the fly.

**Expression**: A unit of code that results in a value. It doesn't have to be saved to a variable.

**Mutate**: To change something. Another related term, _immutable_, means **can't be changed**.

**Arguments**: The parameters you pass to a function. JavaScript gives you a keyword of the same name which contains them all. The _arguments_ keyword in JavaScript holds a value that is _array-like_. This means that it looks like an array, acts like an array, but isn't exactly an array only in the sense that it doesn't have all the features of a JavaScript array. However, it acts enough like an array that we can use it just like an array in most circumstances.

**Automatic Semicolon Insertion**: Semicolons are _optional_ (not really, but read along) in JavaScript so you don't have to put semicolons in your code. This is because when the JavaScript engine sees a certain statement, it knows what the language expects and what the syntax should look like. So if it sees that you're finishing a line, that is when it sees a carriage return (it is an invisible character to you but it is still a character that the syntax parser can see), and if you're not allowed to go to the next line with that particular syntax or statement, it inserts automatically a semicolon for you. Anywhere where the syntax parser expects where a semicolon would be, it would put one for you. That's why its optional **when you're typing it**, not becuase its truly optional. The JavaScript engine is putting semicolons where it thinks they should be, if they're missing. In light of all this, you should always put your own semicolons because you don't want the JavaScript engine to make that decision for you. You want to be certain that you are writing the code as it should be. Especially in the case of **return** statement, ASI can cause a big problem in your code.

**Whitespace**: Invisible characters that create literal _space_ in your written code. These characters include carriage returns, tabs, spaces. They are not executed or translated by the engine becuase the syntax parser ignores them, but they make your code more readable. JavaScript is very liberal in terms of where it accepts whitespace.

**Callback Function**: A function you give to another function, to be run when the other function is finished. So the function you call (i.e. invoke), _calls back_ by calling the function you gave it when it finishes.

**Function Currying**: Creating a copy of a function but with some preset parameters. Very useful in mathematical situations.

## Section 5 - Object-Oriented JavaScript and Prototypal Inheritance

**Inheritance**: The general idea of inheritance is implemented differently in different languages. For our purposes, we only need to understand the most basic concept: One object gets access to the properties and methods of another object. **Classical inheritance** is what's currently best known and popular. It's there in C#, Java, and it's a way of sharing methods and properties of objects. It works but it has its problems. For instance, it's very verbose. **Prototypal inheritance** is much simpler. It's very flexible, extensible, powerful, and easy to understand. It's not perfect either. But when we talk about inheritance in JavaScript, it's different than what we may be talking about with other programming languages.

**Reflection**: An object can look at itself, listing and changing its properties and methods. So a JavaScript object has the ability to look at its own properties and methods. We can use that to implement a very useful pattern called **extend**.

## Section 6 - Building Objects

**Function Constructors**: A normal function that is used to construct objects. The **this** variable points to a new empty object, and that object is returned from the function automatically.

**Polyfill**: Code that adds a feature which the engine _may_ lack. We can have some code that checks to see if the engine has a feature, and if it doesn't we write some code that does the same thing that new feature would do in the newer browser. So we're _filling in_ the gaps where an older engine might not have some features that the newer engines do.

**Syntactic Sugar**: A different way to type something that doesn't change how it works under the hood.

## Section 8 - Examining Famous Frameworks and Libraries

**Method Chaining**: Calling one method after another, and each method affects the parent object. So in _obj.method1().method2()_, both methods end up with a _this_ variable pointing to _obj_.

## Section 10 - BONUS Lectures

**Transpile**: Convert the syntax of one programming language to another. In this case languages that don't really run anywhere, but instead are processed by _transpilers_ that generate JavaScript code.
