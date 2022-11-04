# GitHub Webhooks to Kafka

## Getting Started

First, start up the server:

```console
npm run dev -- --kafka-connection localhost:909
```

Then, set up a HTTP tunnel to the server (we need this for Github to send webhooks to):

```console
ssh -R 80:localhost:8080 localhost.run
```

Create a Github test repository and cnfigure webhooks on your Github repository via `Settings > Webhooks > Add webhook`:

* Set the "Payload URL" to the HTTP tunnel you created. For example `https://7380ea147b74b6.lhr.life/dev/github-webhook`.
* Set the "Content type" to "JSON".

Perform a `git push` on the git repository.

A new deployment is created:

```console
curl localhost:8080/dev/deployment
```
