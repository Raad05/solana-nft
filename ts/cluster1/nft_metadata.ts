import wallet from "./wallet/wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

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

    const image =
      "https://gateway.irys.xyz/F1Qy8w6iVDZUjTRXgzEDer2ZYx3x36Q752ReR2tUvyjT";
    const metadata = {
      name: "ILN NFT",
      symbol: "INFT",
      description: "Proof that you are part of the ILN community",
      image: image,
      attributes: [
        {
          trait_type: "Elite Status",
          value: "100",
        },
      ],
      properties: {
        files: [
          {
            type: "image/png",
            uri: image,
          },
        ],
      },
      creators: [
        {
          address: keypair.publicKey,
          verified: true,
          share: 100,
        },
      ],
    };

    const myUri = await umi.uploader.uploadJson(metadata).catch((err) => {
      throw new Error(err);
    });
    console.log("Your metadata URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
