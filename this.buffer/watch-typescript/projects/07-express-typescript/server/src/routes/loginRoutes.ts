import { NextFunction, Request, Response, Router } from "express";

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const router = Router();

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send("Not permitted");
};

router.get("/", (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in.</div>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <div>You are not logged in.</div>
        <a href="/login">Login</a>
      </div>
    `);
  }
});

router.get("/login", (req: Request, res: Response) => {
  res.send(`
    <form method="post">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
  `);
});

router.post("/login", (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === "hi@hi.com" && password === "password") {
    req.session = { loggedIn: true };
    res.redirect("/");
  } else {
    res.send("Invalid email or password");
  }
});

router.get("/logout", (req: Request, res: Response) => {
  req.session = null;
  res.redirect("/");
});

router.get("/protected", requireAuth, (req: Request, res: Response) => {
  res.send("Welcome to protected route, logged in user");
});

export { router };

// In the current version of express (as of this writing), we would use the
// following approach to give a type to our request body. This is possible
// because in the current version of express, Request is a generic type and it
// accepts the type of the requets body as a generic type parameter.

// type HttpBody = { [key: string]: string | undefined };

// router.post("/login", (req: Request<{}, {}, HttpBody>, res: Response) => {
//   const { email, password } = req.body;
//   if (email) {
//     res.send(email.toUpperCase());
//   } else {
//     res.send("You must provide an email");
//   }
// });
