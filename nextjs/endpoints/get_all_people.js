import { Chisel } from "@chiselstrike/chiselstrike"

export default async function chisel(req) {
    if (req.method == 'GET') {
        try {
            let resp_json = [];
            await Person.cursor().forEach(p => resp_json.push(p))
            return Chisel.json(resp_json);
        } catch (e) {
            return Chisel.json(e, 500);
        }
    }
    return Chisel.json("Only GET is allowed", 405);
}
