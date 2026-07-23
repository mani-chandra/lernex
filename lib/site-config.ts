export const siteConfig = {
  name: "Lernex",
  tagline: "Admissions guidance for medical colleges and B.Tech AI/ML",
  officeAddress:
    process.env.NEXT_PUBLIC_OFFICE_ADDRESS ??
    "Lernex Counseling Center, Hyderabad, Telangana — update NEXT_PUBLIC_OFFICE_ADDRESS",
  officeHours:
    process.env.NEXT_PUBLIC_OFFICE_HOURS ?? "Mon–Sat, 10:00 AM – 6:00 PM",
  medicalFeeInr: 5000,
};
