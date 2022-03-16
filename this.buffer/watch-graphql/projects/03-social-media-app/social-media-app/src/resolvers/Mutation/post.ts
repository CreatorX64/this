import { Post } from "@prisma/client";
import { Context } from "../..";
import { canUserMutatePost } from "../../utils/canUserMutatePost";

interface PostArgs {
  post: {
    title?: string;
    content?: string;
  };
}

interface PostPayload {
  userErrors: { message: string }[];
  post: Post | null;
}

export const postResolvers = {
  postCreate: async (
    _: any,
    { post }: PostArgs,
    { prisma, userInfo }: Context
  ): Promise<PostPayload> => {
    // Check user authentication.
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Forbidden access (unauthenticated)"
          }
        ],
        post: null
      };
    }

    const { title, content } = post;

    if (!title || !content) {
      return {
        userErrors: [
          {
            message: "You must provide a title and a content to create a post."
          }
        ],
        post: null
      };
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userInfo.userId
      }
    });

    return {
      userErrors: [],
      post: newPost
    };
  },
  postUpdate: async (
    _: any,
    { postId, post }: { postId: string; post: PostArgs["post"] },
    { prisma, userInfo }: Context
  ): Promise<PostPayload> => {
    // Check user authentication & authorization.

    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Forbidden access (unauthenticated)"
          }
        ],
        post: null
      };
    }

    const authorizationError = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma
    });

    if (authorizationError) {
      return authorizationError;
    }

    const { title, content } = post;

    // Validate inputs.

    if (!title && !content) {
      return {
        userErrors: [
          {
            message: "Please provide at least one field to update."
          }
        ],
        post: null
      };
    }

    // Check if post actually exists.

    const existingPost = await prisma.post.findUnique({
      where: {
        id: Number(postId)
      }
    });

    if (!existingPost) {
      return {
        userErrors: [
          {
            message: "Post does not exist."
          }
        ],
        post: null
      };
    }

    // Update post & return updated post.

    const payloadToUpdate = {
      title,
      content
    };

    if (!title) {
      delete payloadToUpdate.title;
    }
    if (!content) {
      delete payloadToUpdate.content;
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: Number(postId)
      },
      data: payloadToUpdate
    });

    return {
      userErrors: [],
      post: updatedPost
    };
  },
  postDelete: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayload> => {
    // Check user authentication & authorization.

    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Forbidden access (unauthenticated)"
          }
        ],
        post: null
      };
    }

    const authorizationError = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma
    });

    if (authorizationError) {
      return authorizationError;
    }

    // Check if post exists.

    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId)
      }
    });

    if (!post) {
      return {
        userErrors: [
          {
            message: "Post does not exist."
          }
        ],
        post: null
      };
    }

    await prisma.post.delete({
      where: {
        id: Number(postId)
      }
    });

    return {
      userErrors: [],
      post
    };
  },
  postPublish: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayload> => {
    // Check user authentication & authorization.

    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Forbidden access (unauthenticated)"
          }
        ],
        post: null
      };
    }

    const authorizationError = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma
    });

    if (authorizationError) {
      return authorizationError;
    }

    // Publish post.

    const updatedPost = await prisma.post.update({
      where: { id: Number(postId) },
      data: {
        published: true
      }
    });

    return {
      userErrors: [],
      post: updatedPost
    };
  },
  postUnpublish: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayload> => {
    // Check user authentication & authorization.

    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Forbidden access (unauthenticated)"
          }
        ],
        post: null
      };
    }

    const authorizationError = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma
    });

    if (authorizationError) {
      return authorizationError;
    }

    // Unpublish post.

    const updatedPost = await prisma.post.update({
      where: { id: Number(postId) },
      data: {
        published: false
      }
    });

    return {
      userErrors: [],
      post: updatedPost
    };
  }
};
