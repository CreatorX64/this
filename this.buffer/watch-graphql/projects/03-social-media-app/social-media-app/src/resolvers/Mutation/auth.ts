import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import { Context } from "../..";

interface SignUpArgs {
  credentials: {
    email: string;
    password: string;
  };
  name: string;
  bio: string;
}

interface SignInArgs {
  credentials: {
    email: string;
    password: string;
  };
}

interface AuthPayload {
  userErrors: { message: string }[];
  token: string | null;
}

export const authResolvers = {
  signUp: async (
    _: any,
    { credentials, name, bio }: SignUpArgs,
    { prisma }: Context
  ): Promise<AuthPayload> => {
    const { email, password } = credentials;

    // Validate inputs.

    const userErrors = [];

    if (!validator.isEmail(email)) {
      userErrors.push({
        message: "Invalid email."
      });
    }

    if (!validator.isLength(password, { min: 5 })) {
      userErrors.push({
        message: "Password must include 5 characters or more."
      });
    }

    if (!name || !bio) {
      userErrors.push({
        message: "Name and bio cannot be empty."
      });
    }

    if (userErrors.length > 0) {
      return {
        userErrors,
        token: null
      };
    }

    // Create new user & profile.

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    });

    await prisma.profile.create({
      data: {
        bio,
        userId: newUser.id
      }
    });

    // Generate JWT token & return auth payload.

    const token = jwt.sign(
      {
        userId: newUser.id
      },
      process.env.JWT_SIGNATURE!,
      {
        expiresIn: 3600000
      }
    );

    return {
      userErrors: [],
      token
    };
  },
  signIn: async (
    _: any,
    { credentials }: SignInArgs,
    { prisma }: Context
  ): Promise<AuthPayload> => {
    const { email, password } = credentials;

    // Validate inputs.

    if (!email || !password) {
      return {
        userErrors: [
          {
            message: "Please provide email and password."
          }
        ],
        token: null
      };
    }

    // Verify that user with that email exists.

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return {
        userErrors: [
          {
            message: "Invalid credentials."
          }
        ],
        token: null
      };
    }

    // Verify user password.

    if (!(await bcrypt.compare(password, user.password))) {
      return {
        userErrors: [
          {
            message: "Invalid credentials."
          }
        ],
        token: null
      };
    }

    // Generate new JWT token & return payload.

    const token = jwt.sign(
      {
        userId: user.id
      },
      process.env.JWT_SIGNATURE!,
      {
        expiresIn: 3600000
      }
    );

    return {
      userErrors: [],
      token
    };
  }
};
