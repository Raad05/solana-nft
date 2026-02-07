### NFT Screenshot

<img width="1142" height="778" alt="image" src="https://github.com/user-attachments/assets/7ee12002-fd39-48a3-afab-bc087d2c0b26" />

### Adresses and Hashes

- **Solana Wallet Address**:

```yaml
Gn1uJAErn2taWrEiegyhwvqgEH81FMvK5vL5ezQXCpzW
```

- **Image URI**:

```yaml
https://gateway.irys.xyz/F1Qy8w6iVDZUjTRXgzEDer2ZYx3x36Q752ReR2tUvyjT
```

- **Metadata URI**:

```yaml
https://gateway.irys.xyz/D9h2on2Qa2fYoK6M6fM6zYs1RNqfVXG6tqHjLiuVjXZ2
```

- **Mint Address**:

```yaml
Hy4RtLLCZ4RRa6YFiZ7qKFK2BHg82t9MhgKHSt18evCH
```

- **NFT Minting Signature**:

```yaml
422Tcd1LGTdtvrgGvEu1aPYaDCFAibtAem2r2t2X8EDFuXUCxZgC36w8yDhSJ3TLxWrHMvzati5Xr73FbqGSeHmR
```

- **NFT Transfer Signature**:

```yaml
4LbafcBHwHKRRJMLF1qHAmY7WHhYrGHknmsMwiJ1iQG5DLdTTzbr8M8XpqsHkCBEuDA8B1FZg9mnBBdVgvV2KEJx
```

- **Transferred to**:

```yaml
7RC4XsSGybTHkNfdW7CBrLvYKkqpACRCDQDXFEdGgApw
```

### Limitations

**1. Lack of Liquidity (High Barrier to Entry):**

- **Problem:** High-value NFTs suffer from illiquidity because they require a single buyer with significant capital to purchase the entire asset, which excludes smaller investors.

- **Proposed Solution:** The NFT can be locked in a custodial smart contract vault, which then mints SPL tokens representing percentage ownership. This allows multiple addresses to hold shares of the asset, lowering the barrier to entry and increasing overall market liquidity.

**2. Lack of Atomicity (Counterparty Risk):**

- **Problem:** Manual peer-to-peer trading relies on trust, creating a risk where one party sends an asset without receiving the reciprocal item.

- **Proposed Solution:** Use an Escrow program which enforces an atomic swap, ensuring the transaction only executes if both parties have deposited their assets. If either party fails to deposit, the program reverts, and assets are returned safely to their original owners.
