import { Post } from "@prisma/client";
import { Context } from "..";

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

export const Mutation = {
  postCreate: async (
    _: any,
    { post }: PostArgs,
    { prisma }: Context
  ): Promise<PostPayload> => {
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
        authorId: 1
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
    { prisma }: Context
  ): Promise<PostPayload> => {
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
    { prisma }: Context
  ): Promise<PostPayload> => {
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
  }
};
