import crypto from "crypto";

export const generatePasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const expires = Date.now() + 10 * 60 * 1000; // 10 min

  return { resetToken, hashedToken, expires };
};
