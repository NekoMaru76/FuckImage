import { Interpreter } from "https://deno.land/x/fuckbrain@v1.7/mod.ts";
import { Image } from "https://deno.land/x/imagescript@1.2.9/mod.ts";

export function numberToBrainFuck(num: number): string {
  if (num < 6) return "+".repeat(num);

  const root = Math.floor(Math.sqrt(num));
  const last = num-root*root;console.log(root, last);

  return `+[<][[>]${"+".repeat(root)}[<]-]${numberToBrainFuck(last)}`;
};
export async function imageToBrainFuck(image: Image | string | Uint8Array): Promise<string> {
  let img;

  switch (true) {
    case typeof image === "string": {
      img = await Image.decode(await Deno.readFile(image as string));

      break;
    }
    case image instanceof Image: {
      img = image;

      break;
    }
    case image instanceof Uint8Array: {
      img = await Image.decode(image);

      break;
    }
  }

  img = img as Image;

  const data: string[] = [
    `>`,
    `${"+".repeat(img.width)}>`,
    `${"+".repeat(img.height)}>`
  ];

  for (let y = 1; y <= img.height; y++) {
    for (let x = 1; x <= img.width; x++) {
      data.push(`${"+".repeat(img.getPixelAt(x, y)+1)}>`);
    }
  }

  return data.join("");
};
export async function brainFuckToImage(code: string): Promise<Image> {
  const interpreter = new Interpreter(() => 0);
  const width: number = interpreter.buffer[1] || 0;
  const height: number = interpreter.buffer[2] || 0;
  const image: Image = new Image(width, height);

  await interpreter.execute(code);

  for (let y = 1; y <= height; y++) {
    for (let x = 1; x <= width; x++) {
      image.setPixelAt(x, y, interpreter.buffer[x+y*height-height+3]-1);
    }
  }

  return image;
};
