import { ChiselEvent } from "@chiselstrike/api";
import { Deployment } from "../models/Deployment.ts";

export default async function (event: ChiselEvent) {
    const repository = await event.key.text();
    const deployment = JSON.parse(await event.value.text());
    console.log(`Deploying to ${repository} ...`);
    await Deployment.upsert({
        restrictions: { repository },
        create: { repository, ...deployment },
        update: deployment,
    });
}
