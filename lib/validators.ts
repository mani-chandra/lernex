import { z } from "zod";
import {
  isValidBoard,
  isValidCityForState,
  isValidState,
} from "@/lib/form-options";

const phoneRegex = /^[6-9]\d{9}$/;

const stateField = z
  .string()
  .min(1, "Select a state")
  .refine(isValidState, "Select a valid state");

const cityField = z.string().min(1, "Select a city");

const locationRefine = (
  data: { state: string; city: string },
  ctx: z.RefinementCtx
) => {
  if (!isValidState(data.state)) return;
  if (!isValidCityForState(data.state, data.city)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Select a valid city for the chosen state",
      path: ["city"],
    });
  }
};

export const btechApplicationSchema = z
  .object({
    fullName: z.string().min(2).max(120),
    email: z.string().email(),
    phone: z.string().regex(phoneRegex, "Enter a valid 10-digit Indian mobile number"),
    board: z
      .string()
      .min(1, "Select a board")
      .refine(isValidBoard, "Select a valid board"),
    yearOfPassing: z.coerce.number().int().min(2000).max(2100),
    percentageOrCgpa: z.string().min(1).max(20),
    entranceExamName: z.string().max(120).optional().or(z.literal("")),
    entranceExamScore: z.string().max(40).optional().or(z.literal("")),
    city: cityField,
    state: stateField,
  })
  .superRefine(locationRefine);

export type BtechApplicationInput = z.infer<typeof btechApplicationSchema>;

export const medicalApplicationSchema = z
  .object({
    fullName: z.string().min(2).max(120),
    email: z.string().email(),
    phone: z.string().regex(phoneRegex, "Enter a valid 10-digit Indian mobile number"),
    dateOfBirth: z.string().min(1),
    gender: z.enum(["Male", "Female", "Other"]),
    addressLine1: z.string().min(5).max(200),
    city: cityField,
    state: stateField,
    pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
    neetScore: z.coerce.number().int().min(0).max(720),
    neetRollNumber: z.string().min(4).max(40),
    neetYear: z.coerce.number().int().min(2016).max(2100),
    category: z.enum(["General", "OBC", "SC", "ST", "EWS"]),
    guardianName: z.string().min(2).max(120),
    guardianPhone: z
      .string()
      .regex(phoneRegex, "Enter a valid 10-digit guardian mobile number"),
  })
  .superRefine(locationRefine);

export type MedicalApplicationInput = z.infer<typeof medicalApplicationSchema>;

export const razorpayVerifySchema = z.object({
  applicationId: z.string().min(1),
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export const counselingUpdateSchema = z.object({
  counselingStatus: z.enum(["not_scheduled", "scheduled", "completed"]),
  counselingNotes: z.string().max(2000).optional(),
  scheduledAt: z.string().optional(),
});
