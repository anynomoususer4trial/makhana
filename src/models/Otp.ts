import mongoose, { Schema, model, models } from "mongoose";

export interface IOtp {

  email: string;

  otp: string;

  expiresAt: Date;

}

const otpSchema = new Schema<IOtp>(
  {
    email: {
      type: String,
      required: true,
      index: true
    },

    otp: {
      type: String,
      required: true
    },

    expiresAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// TTL index (auto delete expired OTP)
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otp = models.Otp || model("Otp", otpSchema);

export default Otp;