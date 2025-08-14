import type { APIRoute } from "astro";
import { PNG } from "pngjs";
import { extractColors } from "extract-colors";
import axios from "axios";
import { formatCSS, hex2oklch } from "colorizr";

function isGraytone(r: number, g: number, b: number) {
  if ((r == g && r == b && r == 0) || r + g + b < 20) {
    return true;
  } else {
    const mean = (r + g + b) / 3;
    const sum2diff = (r - mean) ** 2 + (g - mean) ** 2 + (b - mean) ** 2;
    const variance = sum2diff / 3;
    const standDev = Math.sqrt(variance);
    return standDev / mean <= 0.05;
  }
}

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  // data = {
  //   "id": "lauma",
  //   "focus_width": 200,
  //   "focus_height": 200,
  //   "splash_art": {
  //     "id": "519ae800-2763-4806-8796-faf019c1b379",
  //     "storage": "s3",
  //     "filename_disk": "519ae800-2763-4806-8796-faf019c1b379.webp",
  //     "filename_download": "UI_Gacha_AvatarImg_Lauma.webp",
  //     "title": "UI Gacha Avatar Img Lauma.webp",
  //     "type": "image/webp",
  //     "folder": "e73dbb53-c67a-4fc8-8b10-5b4833e8829c",
  //     "uploaded_by": "1797e76e-de5d-4b30-9fe6-675a863ab085",
  //     "created_on": "2025-08-06T20:11:17",
  //     "modified_by": "1797e76e-de5d-4b30-9fe6-675a863ab085",
  //     "modified_on": "2025-08-06T21:50:36",
  //     "charset": null,
  //     "filesize": 574732,
  //     "width": 2048,
  //     "height": 1024,
  //     "duration": null,
  //     "embed": null,
  //     "description": null,
  //     "location": null,
  //     "tags": null,
  //     "metadata": {},
  //     "focal_point_x": 1002,
  //     "focal_point_y": 244,
  //     "tus_id": null,
  //     "tus_data": null,
  //     "uploaded_on": "2025-08-06T20:11:17",
  //     "characters_splash_raw": [
  //       "lauma"
  //     ],
  //     "characters_splash_pad": []
  //   }
  // }

  const ICON_SIDE = 200;

  const transformOptions = [
    [
      "extract",
      {
        left: Math.round(data.splash_art.focal_point_x + (Math.random() * 0.2 - 0.1)*data.splash_art.width),
        top: Math.round(data.splash_art.focal_point_y + (Math.random() * 0.2 - 0.1)*data.splash_art.height),
        width: ICON_SIDE,
        height: ICON_SIDE,
      },
    ],
  ];

  const url = `https://directus.dailydrip.news/assets/${data.splash_art.id}?transforms=${JSON.stringify(transformOptions)}&format=png`;

  const imgoptions = {
    pixels: 100000,
    distance: 0.18,
    saturationDistance: 0.2,
    colorValidator: (red: number, green: number, blue: number, alpha = 255) =>
      !isGraytone(red, green, blue) && alpha > 250,
    lightnessDistance: 0.2,
    hueDistance: 0.083,
  };

  const imgfetch = await fetch(url)
 
  const beforeImageBuffer = Buffer.from(await imgfetch.arrayBuffer())
  const beforeImage = PNG.sync.read(beforeImageBuffer);
  const imageData = {
    data: new Uint8Array(beforeImage.data),
    width: 200,
    height: 200,
  };


  //@ts-ignore
  const colors = (await extractColors(imageData, imgoptions))
    .sort((a, b) => b.area - a.area)
    .map((c) => {
      let colorObj = {
        area: c.area,
        hex: c.hex,
        css: ''
      };
      const hex = c.hex;
      Object.assign(colorObj, hex2oklch(hex));
      colorObj.css = formatCSS(hex2oklch(hex), { format: "oklch" });
      return colorObj;
    });

  return new Response(
    JSON.stringify(colors),
    { status: 200 },
  );
};
