class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
    this.favoriteSnack = "grapes";
  }
}

class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = "DatabaseError";
    this.message = "The message can be static!";
  }
}

class PermissionError extends Error {
  constructor(message) {
    super(message);
    this.name = "PermissionError";
  }
}

// throw new AuthenticationError("Oopsie");

const a = new AuthenticationError("Oopsie");
console.log(a.favoriteSnack);
