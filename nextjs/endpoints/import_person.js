import { Chisel } from "@chiselstrike/chiselstrike"

export default async function chisel(req) {
    if (req.method == 'PUT') {
        try {
            await Person.build(await req.json()).save();
            return Chisel.json("ok");
        } catch (e) {
            return Chisel.json(e, 500);
        }
    }
    return Chisel.json("Only PUT is allowed", 405);
}
