import { ChiselEntity } from "@chiselstrike/api";

export class Post extends ChiselEntity {
  title: string;
  markdown: string;
}
