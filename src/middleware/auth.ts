import { Request, Response, NextFunction } from "express";

// Simple Ethereum address validation (0x + 40 hex chars)
const isValidWalletAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const authenticateWallet = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const walletAddress =
    req.header("x-wallet-address") || req.body.walletAddress;

  if (!walletAddress || !isValidWalletAddress(walletAddress)) {
    return res.status(401).json({ error: "Invalid or missing wallet address" });
  }

  // Optionally attach to req for downstream use
  (req as any).walletAddress = walletAddress;
  next();
};
