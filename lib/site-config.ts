export const siteConfig = {
  name: "Lernex",
  tagline: "Admissions guidance for medical colleges and B.Tech AI/ML",
  company: {
    headline: "Guiding students toward the right college—and the right future",
    intro:
      "Lernex is an admissions counseling partner for families navigating competitive entry into medical colleges and emerging technology programs. We combine structured registration, transparent fees, and in-person expert counseling so every student gets clear next steps—not confusion.",
    mission:
      "Our mission is to make high-stakes admissions simpler: accurate information, honest guidance on NEET-based medical options, and support for students pursuing B.Tech in AI and Machine Learning.",
    foundedNote:
      "From our counseling center, our team works with applicants across Telangana and beyond, helping them understand cutoffs, categories, and college fit before they commit.",
  },
  values: [
    {
      title: "Student-first counseling",
      description:
        "Medical guidance is delivered in person, based on your NEET score and category—not generic advice.",
    },
    {
      title: "Clear process",
      description:
        "Register online, complete payment where required, and visit our office with a reference ID and documents ready.",
    },
    {
      title: "Two focused tracks",
      description:
        "Dedicated flows for medical admissions and B.Tech AI/ML so you only share what’s relevant to your goal.",
    },
  ],
  officeAddress:
    process.env.NEXT_PUBLIC_OFFICE_ADDRESS ??
    "Lernex Counseling Center, Hyderabad, Telangana — update NEXT_PUBLIC_OFFICE_ADDRESS",
  officeHours:
    process.env.NEXT_PUBLIC_OFFICE_HOURS ?? "Mon–Sat, 10:00 AM – 6:00 PM",
  medicalFeeInr: 5000,
};
