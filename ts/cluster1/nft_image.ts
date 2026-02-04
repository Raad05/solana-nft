import wallet from "./wallet/wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { readFile } from "fs/promises";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    //1. Load image
    const imgFile = await readFile("./assets/nft.png");
    //2. Convert image to generic file.
    const umiImgFile = createGenericFile(imgFile, "nft.png", {
      tags: [{ name: "contentType", value: "image/png" }],
    });
    //3. Upload image
    const imgUri = await umi.uploader.upload([umiImgFile]).catch((err) => {
      throw new Error(err);
    });
    const image = imgUri;
    const [myUri] = image;
    console.log("Your image URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
