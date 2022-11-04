import { ChiselEntity } from "@chiselstrike/api";

export class Deployment extends ChiselEntity {
    /** The GitHub repository to deploy from.  */
    repository: string;
    /** The username that inititated the deployment.  */
    pusher: string;
    /** The head git commit ID of the deployment.  */
    head: string;
}
