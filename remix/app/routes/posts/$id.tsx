import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/post.server";
import invariant from "tiny-invariant";
import { marked } from "marked";

type LoaderData = { title: string; html: string };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, `params.id is required`);
  const post = await getPost(params.id);
  invariant(post, `Post not found: ${params.id}`);
  invariant(post.title, `Post without a title: ${params.id}`);
  const html = marked(post.markdown);
  const title = post.title;

  return json<LoaderData>({ title, html });
};

export default function PostSlug() {
  const { title, html } = useLoaderData() as LoaderData;
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
