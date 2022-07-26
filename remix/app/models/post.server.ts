// We import the ChiselStrike type directly and can reuse it in here.
// It should also be possible to do the other way around: define the type
// in the frontend, and get ChiselStrike to consume it.
//
// Progress on using user-define types is https://github.com/chiselstrike/chiselstrike/issues/1589. It's a great
// starter issue for an OSS contributor!
import type { Post } from "../../chiselstrike/Post";
export type { Post } from "../../chiselstrike/Post";

function chiselUrl(name: string): string {
  // Use environment variables to figure out where we are. Locally or deployed somehere?
  // By default we're local
  const chiselServer = process.env.CHISEL_SERVER ?? "http://localhost:8080";
  // Which version? Versions are isolated backends that can be used in the same
  // chisel instance. You can do test databases, API versions, or what your heart
  // desires. By (local) default this is "dev", but when deployed it is customary
  // for this to be "main" (github's main branch) or a PR number.
  const chiselVersion = process.env.CHISEL_VERSION ?? "dev";
  return `${chiselServer}/${chiselVersion}/${name}`;
}

// In practice you could use a higher level library here such as Axios, or
// even hide everything behind tRPC. We are open coding fetches so it becomes
// abundandtly obvious that those are really just HTTP endpoints!
//
// You can do anything you want with them, including going headless, microservices, etc.

// The first function just gets all posts. No pagination, no filtering, though all of that
// can be easily added!
export async function getPosts(): Promise<Array<Post>> {
  const url = chiselUrl("posts");
  console.log(url);
  return fetch(url).then((response) => {
    return response.json().then((crud) => {
      return crud.results;
    });
  });
}

// The second function will just call the POST endpoint and create an object.
export async function createPost(post) {
  const url = chiselUrl("posts");
  return fetch(url, {
    method: "post",
    body: JSON.stringify(post),
    headers: { "Content-Type": "application/json" },
  });
}

// Last option is to get a post, given its ID. With this, we have everything we need!
export async function getPost(id: string): Promise<Post> {
  const url = `${chiselUrl("posts")}/${id}`;
  return fetch(url).then((response) => {
    return response.json();
  });
}
