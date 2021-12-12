import { brainFuckToImage, imageToBrainFuck } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import { Image } from "https://deno.land/x/imagescript@1.2.9/mod.ts";

let code: string = '';

await Deno.test({
  name: "Image to BrainFuck",
  async fn() {
    code = await imageToBrainFuck("./deno.png");

    await Deno.writeTextFile("./deno.bf", code);
  }
});
