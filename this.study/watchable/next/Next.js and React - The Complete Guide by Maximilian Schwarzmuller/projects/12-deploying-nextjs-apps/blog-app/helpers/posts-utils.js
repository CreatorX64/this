import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostData(postIdentifier) {
  const slug = postIdentifier.replace(/\.md$/, "");
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return {
    ...data,
    slug,
    content
  };
}

export function getPostFilenames() {
  return fs.readdirSync(postsDirectory);
}

export function getAllPosts() {
  const postFilenames = getPostFilenames();
  return postFilenames
    .map((filename) => getPostData(filename))
    .sort((postA, postB) => postB.date - postA.date);
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.isFeatured);
}
