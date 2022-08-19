import { ChiselEntity } from "@chiselstrike/api"

/**
 * The `TopOfBook` entity represents the best bids and offers of an instrument.
 */
export class TopOfBook extends ChiselEntity {
    /** The symbol of the traded instrument.  */
    symbol: string;
    /** The best bid price.  */
    bidPrice?: number;
    /** The best bid volume.  */
    bidVolume?: number;
    /** The best ask price.  */
    askPrice?: number;
    /** The best ask price.  */
    askVolume?: number;
}
