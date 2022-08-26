import { ChiselRequest, responseFromJson } from "@chiselstrike/api";

import { Person } from "../models/person.model";

export default async function chisel(req: ChiselRequest) {
  if (req.method == "POST") {
    const payload = await req.json();
    const firstName = payload["firstName"];
    const lastName = payload["lastName"];
    const created = await Person.create({ firstName, lastName });
    return responseFromJson(created);
  }
  return responseFromJson("Only POST is allowed", 405);
}
