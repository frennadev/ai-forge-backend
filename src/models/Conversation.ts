import mongoose, { Document, Schema, Types } from "mongoose";

export type Sender = "user" | "agent";

export interface IConversation extends Document {
  agentId: Types.ObjectId;
  walletAddress: string;
  message: string;
  sender: Sender;
  timestamp: Date;
}

const ConversationSchema = new Schema<IConversation>({
  agentId: { type: Schema.Types.ObjectId, ref: "Agent", required: true },
  walletAddress: { type: String, ref: "User", required: true },
  message: { type: String, required: true },
  sender: { type: String, enum: ["user", "agent"], required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IConversation>(
  "Conversation",
  ConversationSchema
);
