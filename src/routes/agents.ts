import { Router } from "express";
import {
  listAgents,
  createAgent,
  getAgent,
  chatWithAgent,
  updateAgent,
  deleteAgent,
} from "../controllers/agents";
import { authenticateWallet } from "../middleware/auth";

const router = Router();

router.get("/", authenticateWallet, listAgents);
router.post("/", authenticateWallet, createAgent);
router.get("/:id", authenticateWallet, getAgent);
router.post("/:id/chat", authenticateWallet, chatWithAgent);
router.put("/:id", authenticateWallet, updateAgent);
router.patch("/:id", authenticateWallet, updateAgent);
router.delete("/:id", authenticateWallet, deleteAgent);

export default router;
