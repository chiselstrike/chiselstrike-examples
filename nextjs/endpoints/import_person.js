import { responseFromJson } from "@chiselstrike/api"

export default async function chisel(req) {
    if (req.method == 'PUT') {
        try {
            await Person.build(await req.json()).save();
            return responseFromJson("ok");
        } catch (e) {
            return responseFromJson(e, 500);
        }
    }
    return responseFromJson("Only PUT is allowed", 405);
}
