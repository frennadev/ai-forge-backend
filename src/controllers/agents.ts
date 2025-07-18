import { Request, Response } from "express";
import Agent from "../models/Agent";

export const listAgents = async (req: Request, res: Response) => {
  try {
    const { walletAddress } = req.query;
    if (!walletAddress || typeof walletAddress !== "string") {
      return res
        .status(400)
        .json({ error: "walletAddress query param required" });
    }
    const agents = await Agent.find({ walletAddress });
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch agents" });
  }
};

export const createAgent = async (req: Request, res: Response) => {
  try {
    const { name, prompts, walletAddress, status } = req.body;
    if (!name || !walletAddress || !status) {
      return res
        .status(400)
        .json({ error: "name, walletAddress, and status are required" });
    }
    const agent = await Agent.create({ name, prompts, walletAddress, status });
    res.status(201).json(agent);
  } catch (err) {
    res.status(500).json({ error: "Failed to create agent" });
  }
};

export const getAgent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const agent = await Agent.findById(id);
    if (!agent) return res.status(404).json({ error: "Agent not found" });
    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch agent" });
  }
};

export const chatWithAgent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    // For now, just echo or mock a response
    res.json({ agentId: id, reply: `Echo: ${message}` });
  } catch (err) {
    res.status(500).json({ error: "Failed to chat with agent" });
  }
};

export const updateAgent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const agent = await Agent.findByIdAndUpdate(id, update, { new: true });
    if (!agent) return res.status(404).json({ error: "Agent not found" });
    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: "Failed to update agent" });
  }
};

export const deleteAgent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const agent = await Agent.findByIdAndDelete(id);
    if (!agent) return res.status(404).json({ error: "Agent not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete agent" });
  }
};
