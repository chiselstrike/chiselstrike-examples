# Usage

After the first checkout, run `npm install`.

To start the frontend server, run `npm run dev` in this directory.

In another window, run `chisel dev` in this directory.

Visit http://localhost:3000

## OAuth Setup

Copy the env-local sample to the real file: `cp .env.local.sample .env.local`.

Create a GitHub OAuth app.  Copy its client ID and paste it into
.env.local instead of the `your_oauth_app_id_here` string.

Restart the frontend server.
