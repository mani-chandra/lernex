export const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;

export type IndianState = (typeof INDIAN_STATES)[number];

export const BOARDS_12TH = [
  "CBSE",
  "ICSE / ISC",
  "NIOS",
  "Telangana State Board (TSBIE)",
  "Andhra Pradesh Board (BIEAP)",
  "Tamil Nadu State Board",
  "Karnataka State Board (PU)",
  "Kerala State Board (DHSE)",
  "Maharashtra State Board (HSC)",
  "West Bengal Council (WBBSE/WBCHSE)",
  "Gujarat State Board (GSEB)",
  "Rajasthan State Board (RBSE)",
  "Uttar Pradesh State Board (UPMSP)",
  "Madhya Pradesh State Board (MPBSE)",
  "Bihar State Board (BSEB)",
  "Punjab State Board (PSEB)",
  "Haryana State Board (BSEH)",
  "Odisha State Board (CHSE)",
  "Assam State Board (AHSEC)",
  "Jharkhand State Board (JAC)",
  "Chhattisgarh State Board (CGBSE)",
  "IB (International Baccalaureate)",
  "Cambridge (IGCSE / A Levels)",
  "Other state board",
] as const;

export type Board12th = (typeof BOARDS_12TH)[number];

/** Major cities per state/UT for registration dropdowns */
export const CITIES_BY_STATE: Record<IndianState, readonly string[]> = {
  "Andaman and Nicobar Islands": ["Port Blair", "Diglipur", "Rangat"],
  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Kurnool",
    "Tirupati",
    "Kakinada",
    "Rajahmundry",
    "Kadapa",
    "Anantapur",
  ],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang"],
  Assam: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tezpur"],
  Bihar: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia"],
  Chandigarh: ["Chandigarh"],
  Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  Delhi: [
    "New Delhi",
    "North Delhi",
    "South Delhi",
    "East Delhi",
    "West Delhi",
    "Central Delhi",
  ],
  Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar"],
  Haryana: ["Faridabad", "Gurugram", "Panipat", "Ambala", "Karnal", "Rohtak"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Mandi", "Solan", "Kullu"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
  Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Kalaburagi"],
  Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
  Ladakh: ["Leh", "Kargil"],
  Lakshadweep: ["Kavaratti"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"],
  Manipur: ["Imphal", "Thoubal"],
  Meghalaya: ["Shillong", "Tura"],
  Mizoram: ["Aizawl", "Lunglei"],
  Nagaland: ["Kohima", "Dimapur"],
  Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"],
  Puducherry: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner"],
  Sikkim: ["Gangtok", "Namchi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"],
  Telangana: [
    "Hyderabad",
    "Warangal",
    "Nizamabad",
    "Karimnagar",
    "Khammam",
    "Ramagundam",
    "Mahbubnagar",
    "Nalgonda",
  ],
  Tripura: ["Agartala", "Udaipur"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Prayagraj", "Noida"],
  Uttarakhand: ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rishikesh"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
};

export function getCitiesForState(state: string): readonly string[] {
  if (state in CITIES_BY_STATE) {
    return CITIES_BY_STATE[state as IndianState];
  }
  return [];
}

export function isValidState(state: string): state is IndianState {
  return (INDIAN_STATES as readonly string[]).includes(state);
}

export function isValidCityForState(state: string, city: string): boolean {
  return getCitiesForState(state).includes(city);
}

export function isValidBoard(board: string): board is Board12th {
  return (BOARDS_12TH as readonly string[]).includes(board);
}
