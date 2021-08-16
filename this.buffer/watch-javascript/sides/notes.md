# Course Notes

## Section 2 - Execution Contexts and Lexical Environments

**Syntax Parser**: A program that reads your code and determines what it does and if its grammar is valid.

**Lexical Environment**: Where something sits physically in the code you write. **Lexical** means *having to do with words and grammar*. A lexical environment exists in programming languages in which *where* you write something is important.

**Execution Context**: A wrapper to help manage the code that is running. There are lots of lexical environments. Which one is currently running is managed via execution contexts. It can contain things beyond what you've written in your code.

**Name/Value Pair**: A name which maps to a unique value. The name may be defined more than once, but only can have one value in any given *execution context* (which is a section of code that is running). That value may be more name/value pairs.

**Object**: A collection of name/value pairs. That's the simplest definition of an object when talking about JavaScript. That's because at its core, objects are literally nothing more than name/value pairs in JavaScript.

**Global**: In JavaScript, global means *not inside a function*. Simple as that.

**Single Thread**: This basically means one command is executed at a time. Under the hood of the browser, this may not be the case. But from our perspective as programmers, JavaScript behaves in a single threaded manner.

**Synchronous**: This is very similar to *single threaded*. In the context of programming, synchronous means *one at a time, in order*. One line of code being executed, for synchronous execution, at a time, in order.

**Invocation**: Running a function. In JavaScript, by using parenthesis. Every function invocation creates a new execution context that's placed on top of the **execution stack**. Then, inside that execution context, JavaScript engine goes through the first phase of creating an execution context (the *creation phase*) where it creates a **this** binding, creates a reference to the outer (lexical) environment, and it goes through the process of **hoisting**, after which the engine proceeds to the second phase of execution context: *Execution phase*.

**Variable Environment**: Where the variables live and how they relate to each other in memory. Every execution context has its own variable environment. For instance, the global execution context's variable environment is the global object, or **window** object in the browser.

**Scope**: Where a variable is available in your code. Variables that are created using the **var** keyword have a **function scope** (meaning that they are only available inside the function [or *execution context*] that they were created in), whereas variables created using the **let** keyword have a **block scope** (meaning that they are only available inside the physical [or lexical] block in which they're defined in). Definition of *scope* taken from MDN: The current context of execution. The context in which values and expressions are "visible" or can be referenced. If a variable or other expression is not "in the current scope", then it is unavailable for use. Scopes can also be layered in a hierarchy, so that child scopes have access to parent scopes, but not vice versa.

**Scope Chain**: A term used to describe the connection between an execution context, its outer (lexical) environment reference, and that outer environment's outer environment reference, and so on until the global lexical environment is reached. Definition of *scope chain* taken from StackOverflow: "The scope chain is used to resolve the value of variable names in javascript. Without a scope chain the Javascript engine wouldn't know which value to pick for a certain variable name if there are multiple defined at different scopes."

**Asynchronous**: In the context of programming, this simply means *more than one at a time*. Note that JavaScript is synchronous, meaning that the JavaScript engine executes code one line at a time. However, the environment in which the JavaScript engine exists, for instance the browser, can have other pieces and modules of code that can handle other tasks (like making HTTP requests or painting the UI). JavaScript engine has hooks through which it can work with these other parts of the browser. In addition, aside from the execution stack, the JavaScript engine keeps another list called **event queue**. When an event happens in the browser (like a click, HTTP request being ready, page load, and so on), the browser puts information about that event in the JavaScript engine's event queue. Then, once the JavaScript engine's execution stack is empty, the engine checks its event queue and then runs the handler functions for the events in order, if any. Then when the execution stack is empty again, the engine checks the event queue again (this continuous process of checking the event queue is called the **event loop**). That's why JavaScript seems asynchronous, but the JavaScript engine itself does all of these things synchronously. In truth, the browser is the one that's asynchrounously running a lot of parts at the same time. So again, asynchronous processes are possible in JavaScript but the asynchronous part is really about what's happening *outside* of the JavaScript engine.

## Section 3 - Types and Operators

**Dynamic Typing**: You don't tell the engine what type of data a variable holds, it figures it out while your code is running. Variables can hold different types of values because it's all figured out during execution.

**Static Typing**: You tell the engine (or compiler, interpreter) ahead of time what kind of data you intend to hold inside a variable.

**Primitive Type**: A type of data that represents a single value. That is, not an object. In JavaScript there are 7 primitive types:
- **undefined**: Represents lack of existence. You shouldn't set a variable to this.
- **null**: Represents lack of existence. You can set a variable to this.
- **boolean**: *true* or *false*.
- **number**: *Floating point* number (there's always some decimals). Unlike other programming languages, there's only one *number* type, and it's a floating point number.
- **bigint**: A numeric data type that can represent integers in the *arbitrary precision format*.
- **string**: A sequence of characters.
- **symbol**: Used in ES6. A value that's guaranteed to be unique.

**Operator**: A special function that is syntactically (written) different. Generally, operators take two parameters and return one result. In JavaScript, operators are special types of functions that the operands are being passed as arguments and a value is being returned. Inside those functions, there's pre-built logic written for you that the JavaScript engine provides. This logic inside these special functions are especially important for dynamically typed languages like JavaScript, because it basically decides what happens when the function (the operator) is passed in a  value of a certain type.

**Operator Precedence**: Rules that govern which operator function gets called first. Functions are called in order of precendence (higher precedence wins).

**Associativity**: What order operator functions get called in when functions have the *same* precendence: Left-to-right (*left associative*) or right-to-left (*right associative*). Associativity, along with operator precedence, is important in JavaScript because JavaScript is dynamically typed.

**Coercion**: Converting a value from one type to another. This happens quite often in JavaScript because it's dynamically typed. We know that operators are specials functions that run some logic, so part of that logic is coercion. It is a fundamental part of the JavaScript language.

## Section 4 - Objects and Functions

**Namespace**: In modern coding, a *namespace* is a container for variables and functions. It is used typically to keep variables and functions with the same name separate, to keep them in different *spaces* defined by different *names*. JavaScript doesn't have the concept of a namespace, but because of the nature of objects in JavaScript, we don't need namespaces as a feature. We can fake it.

**First Class Functions**: In a programming language that has *first class functions* (like JavaScript), everything you can do with other types you can do with functions. Assign them to variables, pass them around, create them on the fly.

**Expression**: A unit of code that results in a value. It doesn't have to be saved to a variable.

**Mutate**: To change something. Another related term, *immutable*, means **can't be changed**.