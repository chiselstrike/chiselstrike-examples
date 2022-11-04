import { publishEvent } from "@chiselstrike/api";

export default async function (req: Request) {
    const event = await req.json();
    const repository = event["repository"]["full_name"];
    const pusher = event["pusher"]["name"];
    const head = event["head_commit"]["id"];
    const deployment = {
        pusher,
        head,
    };
    await publishEvent({
        topic: "deployment",
        key: repository,
        value: JSON.stringify(deployment),
    });
    return new Response("ok");
}
