let userInput: unknown; // More restrictive than "any"
// let userInput: any;
let userName: string;

userInput = 5;
userInput = "Max";

// userName = userInput; // Error if userInput is "unknown", no error if it's "any"

// Type checking is required for "unknown"
if (typeof userInput === "string") {
  userName = userInput;
}

// For the reasons above, "unknown" is a better choice for types which you don't
// know what the type is. You should still use it VERY carefully, and preferably
// never use it.

function generateError(message: string, code: number): never {
  throw { message, errorCode: code };

  // Another use case: Forever loops
  // while (true) {}
}

const result = generateError("An error occurred!", 500);
console.log(result); // Code never comes here, because generateError "never" returns!
