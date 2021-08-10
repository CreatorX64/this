# Course Notes

## Section 2 - Execution Contexts and Lexical Environments

**Syntax Parser**: A program that reads your code and determines what it does and if its grammar is valid.

**Lexical Environment**: Where something sits physically in the code you write. **Lexical** means *having to do with words and grammar*. A lexical environment exists in programming languages in which *where* you write something is important.

**Execution Context**: A wrapper to help manage the code that is running. There are lots of lexical environments. Which one is currently running is managed via execution contexts. It can contain things beyond what you've written in your code.

**Name/Value Pair**: A name which maps to a unique value. The name may be defined more than once, but only can have one value in any given *execution context* (which is a section of code that is running). That value may be more name/value pairs.

**Object**: A collection of name/value pairs. That's the simplest definition when talking about JavaScript because at its core, objects are literally nothing more than name/value pairs in JavaScript.

**Global**: In JavaScript, global means *not inside a function*. Simple as that.

**Single Thread**: This basically means one command is executed at a time. Under the hood of the browser, this may not be the case. But from our perspective as programmers, JavaScript behaves in a single threaded manner.

**Synchronous**: This is very similar to *single threaded*. In the context of programming, synchronous means *one at a time, in order*. One line of code being executed, for synchronous execution, at a time, in order.

**Invocation**: Running a function. In JavaScript, by using parenthesis. Every function invocation creates a new execution context that's placed on top of the execution stack. Then, inside that execution context, JavaScript engine goes through the first phase of creating an execution context where it creates a *this* binding, creates a reference to the outer (lexical) environment, and it goes through the process of hoisting, after which the engine proceeds to the second phase of execution context: Running the code.

**Variable Environment**: Where the variables live and how they relate to each other in memory. Every execution context has its own variable environment. For instance, the global execution context's variable environment is the global object, or *window* object in the browser.

**Scope**: Where a variable is available in your code. Variables that are created using the *var* keyword have a function scope (meaning that they are only available inside the function [or *execution context*] that they were created in), whereas variables created using the *let* keyword have a block scope (meaning that they are only available inside the physical [or lexical] block in which they're defined). Definition taken from MDN: The current context of execution. The context in which values and expressions are "visible" or can be referenced. If a variable or other expression is not "in the current scope", then it is unavailable for use. Scopes can also be layered in a hierarchy, so that child scopes have access to parent scopes, but not vice versa.

**Scope Chain**: A term used to describe the connection between an execution context, its outer (lexical) environment reference, and that outer environment's outer environment reference, and so on until the global lexical environment. Definition taken from StackOverflow: "The scope chain is used to resolve the value of variable names in javascript. Without a scope chain the Javascript engine wouldn't know which value to pick for a certain variable name if there are multiple defined at different scopes."

**Asynchronous**: In the context of programming, this simply means *more than one at a time*. Note that JavaScript is synchronous, meaning that the JavaScript engine executes code one line at a time. However, the environment in which the JavaScript engine exists, for instance the browser, can have other pieces and modules of code that can handle other tasks (like making HTTP requests or painting the UI). JavaScript engine has hooks through which it can work with these other parts of the browser. In addition, aside from the execution stack, the JavaScript engine keeps another list called **event queue**. When an event happens in the browser (like a click, HTTP request being ready, page load, and so on), the browser puts information about that event in the JavaScript engine's event queue. Then, once the JavaScript engine's execution stack is empty, the engine checks its event queue and then runs the handler functions for the events in order, if any. Then when the execution stack is empty again, the engine checks the event queue again (this continuous process of checking the event queue is called the **event loop**). That's why JavaScript seems asynchronous, but the JavaScript engine itself does all of those synchronously. In truth, the browser is the one that's asynchrounously running a lot of parts at the same time. So again, asynchronous processes are possible in JavaScript but the asynchronous part is really about what's happening *outside* of the JavaScript engine.