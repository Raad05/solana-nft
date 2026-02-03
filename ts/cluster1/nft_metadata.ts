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
    // Follow this JSON structure
    // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure
    const imgFile = await readFile("file path");

    const umiImgFile = createGenericFile(imgFile, "file name", {
      tags: [{ name: "contentType", value: "image/jpeg" }],
    });

    const imgUri = await umi.uploader.upload([umiImgFile]).catch((err) => {
      throw new Error(err);
    });

    const metadata = {
      name: "ILN NFT",
      symbol: "INFT",
      description: "Proof that you are part of the ILN community",
      image: imgUri[0],
      attributes: [
        {
          trait_type: "Elite Status",
          value: "100",
        },
      ],
      properties: {
        files: [
          {
            type: "image/jpeg",
            uri: "file path",
          },
        ],
      },
      creators: ["Gn1uJAErn2taWrEiegyhwvqgEH81FMvK5vL5ezQXCpzW"],
    };

    const myUri = await umi.uploader.uploadJson(metadata).catch((err) => {
      throw new Error(err);
    });
    console.log("Your metadata URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
