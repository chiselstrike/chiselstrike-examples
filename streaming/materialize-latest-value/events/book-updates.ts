import { ChiselEvent } from "@chiselstrike/api";
import { TopOfBook } from "../models/TopOfBook";

function toJSON(buffer: ArrayBuffer) {
    return JSON.parse(String.fromCharCode.apply(null, new Uint8Array(buffer)));
}

export default async function (event: ChiselEvent) {
    const bookUpdate = toJSON(event.value);
    const symbol = bookUpdate.symbol;
    await TopOfBook.upsert({
        restrictions: { symbol },
	create: bookUpdate,
	update: bookUpdate,
    });
}
