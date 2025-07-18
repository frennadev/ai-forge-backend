import mongoose, { Document, Schema } from "mongoose";

export type AgentStatus = "active" | "inactive" | "training";

export interface IAgent extends Document {
  name: string;
  prompts: string[];
  walletAddress: string;
  createdAt: Date;
  status: AgentStatus;
  interactions: number;
  lastActive: Date;
}

const AgentSchema = new Schema<IAgent>({
  name: { type: String, required: true },
  prompts: { type: [String], default: [] },
  walletAddress: { type: String, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["active", "inactive", "training"],
    required: true,
  },
  interactions: { type: Number, default: 0 },
  lastActive: { type: Date },
});

export default mongoose.model<IAgent>("Agent", AgentSchema);
