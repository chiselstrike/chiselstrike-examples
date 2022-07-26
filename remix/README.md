# ChiselStrike Remix example

This is an example showing how ChiselStrike can be used with Remix' blog post example.
This README.md file will evolve as you go through the commits.

For now, the project was initialized with the remix stack initialization according to [the Remix tutorial](https://remix.run/docs/en/v1/tutorials/blog)

The steps taken to get us to this point (you don't have to do them!) were:

```sh
npx create-remix --template remix-run/indie-stack remix
? TypeScript or JavaScript? TypeScript
? Do you want me to run `npm install`? No
```

For more information on the baseline Remix project, check their [README](https://github.com/remix-run/indie-stack)

To get started, initialize the dependencies:

```sh
npm install
```

And then set up your .env file. For local test deployments, the .example is good enough!

```sh
cp .env.example .env # change values accordingly
```

> Notice that one of these variables is Prisma's `DATABASE_URL`. In this example, we will follow the Remix examples
> to add Blog posts to the site, but we'll keep the user management that is already implemented in the example with
> Prisma+SQLite. That's totally fine! We know that in real life projects have a history, and this example goes a long
> way to show how ChiselStrike can be used to enhance an existing project. But if you want to convert the existing SQLite
> code to ChiselStrike and send us a PR, we would obviously consider it!

To initialize the ChiselStrike project, do this at the top level of your Remix directory:

```sh
npx create-chiselstrike-app chiselstrike
```

First let's make sure that the Remix `run` command will also start ChiselStrike. Add this to the `scripts` session of your `package.json` file

```json
    "dev:chiselstrike": "cd chiselstrike; npm run dev",
```

Now Start the remix dev server:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

The (Prisma+SQLite) database seed script creates a new user with some data you can use to get started:

- Email: `rachel@remix.run`
- Password: `racheliscool`
