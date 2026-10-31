import type { AtarAuthority, AtarSubject } from "@/lib/calculators/atar";
import type { OfficialSource } from "./types";

/** One Australian state or territory certificate whose ATAR an admissions centre calculates. */
export interface AuAtarState {
  /** URL segment: /au/atar-calculator/{slug} */
  slug: "vce" | "hsc" | "qce" | "wace" | "sace";
  /** Certificate students search for. */
  certificate: string;
  /** States/territories the centre covers. */
  region: string;
  /** Admissions centre that calculates the ATAR. */
  centre: string;
  authority: AtarAuthority;
  /** Example subjects the page opens with (typical for the state; scaled scores out of 100). */
  subjects: AtarSubject[];
  /** Rules copied from the centre's own pages. */
  facts: string[];
  /** Where this calculator simplifies the official rule. */
  modelNote: string;
  source: OfficialSource;
}

const CHECKED = "2026-10-30";

export const auAtarStates: AuAtarState[] = [
  {
    slug: "vce",
    certificate: "VCE",
    region: "Victoria",
    centre: "VTAC",
    authority: "vtac",
    subjects: [
      // Scaled study scores 34, 38, 35, 31 and 30 (out of 50), doubled to the 0–100 input scale.
      { name: "English", scaledScore: 68 },
      { name: "Mathematical Methods", scaledScore: 76 },
      { name: "Chemistry", scaledScore: 70 },
      { name: "Psychology", scaledScore: 62 },
      { name: "Legal Studies", scaledScore: 60 },
    ],
    facts: [
      "Your ATAR aggregate starts with a primary four: your best scaled study score from the English group (English, English (EAL), Literature or English Language) plus your next three highest permissible scaled study scores.",
      "A fifth and a sixth study can each add an increment of 10% of their scaled study score. A maximum of six studies count — with more than six results, only the highest-scoring six are used.",
      "For VE3 block credit, the increment is 10% of the fourth study score in your primary four.",
    ],
    modelNote:
      "Enter scaled study scores out of 50 doubled to a 0–100 scale (a scaled 35 is 70). The calculator applies VTAC's primary-four and increment rules, then maps the aggregate to an ATAR with a fixed planning curve — VTAC's real aggregate-to-ATAR conversion changes every year.",
    source: {
      publisher: "Victorian Tertiary Admissions Centre (VTAC)",
      title: "ATAR and scaling",
      href: "https://vtac.edu.au/help/atar-scaling",
      checked: CHECKED,
      edition: "Last updated 21 September 2026",
    },
  },
  {
    slug: "hsc",
    certificate: "HSC",
    region: "New South Wales and the ACT",
    centre: "UAC",
    authority: "uac",
    subjects: [
      { name: "English Advanced", scaledScore: 78 },
      { name: "Mathematics Advanced", scaledScore: 82 },
      { name: "Biology", scaledScore: 74 },
      { name: "Business Studies", scaledScore: 72 },
      { name: "Modern History", scaledScore: 76 },
      { name: "Mathematics Extension 1", scaledScore: 80, hscUnits: 1 },
    ],
    facts: [
      "UAC calculates your ATAR from your best 2 units of English plus your best 8 units from your remaining units.",
      "To be eligible for an ATAR in NSW you must satisfactorily complete at least 10 units of HSC courses, including 10 units of Board Developed courses, 2 units of English, three Board Developed courses of 2 units or greater, and four subject areas.",
      "ACT Year 12 students also view their ATAR through UAC, using the student number issued by the ACT Board of Senior Secondary Studies and a UAC PIN.",
    ],
    modelNote:
      "Enter each course's scaled mark out of 100 and its units (2 for most courses, 1 for Extension courses). The calculator picks the best 2 English units and best 8 remaining units as UAC does, then maps the average to an ATAR with a fixed planning curve — not UAC's yearly scaling.",
    source: {
      publisher: "Universities Admissions Centre (UAC)",
      title: "FAQs about the ATAR",
      href: "https://uac.edu.au/future-applicants/faqs-and-forms/atar",
      checked: CHECKED,
    },
  },
  {
    slug: "qce",
    certificate: "QCE",
    region: "Queensland",
    centre: "QTAC",
    authority: "qtac",
    subjects: [
      { name: "English", scaledScore: 72, qceType: "general" },
      { name: "Mathematical Methods", scaledScore: 78, qceType: "general" },
      { name: "Chemistry", scaledScore: 74, qceType: "general" },
      { name: "Biology", scaledScore: 76, qceType: "general" },
      { name: "Legal Studies", scaledScore: 70, qceType: "general" },
    ],
    facts: [
      "To be ATAR eligible you complete five General subjects (Units 3 and 4), or four General subjects plus one Applied subject (Units 3 and 4) or a VET course at AQF Certificate III level or higher.",
      "You must also satisfactorily complete an English subject with a minimum grade of C. The English result counts toward the ATAR only if it is one of your best five scaled results.",
      "QTAC adds your best five scaled subject results from eligible inputs into a best five Subject Aggregate, and your results must fall within a five-year period.",
    ],
    modelNote:
      "Enter scaled results out of 100 and mark each subject General, Applied or VET. The calculator picks the best eligible five as QTAC does and checks the English requirement, then maps the aggregate to an ATAR with a fixed planning curve — QTAC's scaling changes every year.",
    source: {
      publisher: "Queensland Tertiary Admissions Centre (QTAC)",
      title: "ATAR",
      href: "https://www.qtac.edu.au/atar/",
      checked: CHECKED,
    },
  },
  {
    slug: "wace",
    certificate: "WACE",
    region: "Western Australia",
    centre: "TISC",
    authority: "tisc",
    subjects: [
      { name: "English", scaledScore: 70 },
      { name: "Mathematics Methods", scaledScore: 72, waceBonus: "maths-methods" },
      { name: "Chemistry", scaledScore: 75 },
      { name: "Physics", scaledScore: 73 },
      { name: "Japanese: Second Language", scaledScore: 68, waceBonus: "lote" },
    ],
    facts: [
      "Your Tertiary Entrance Aggregate (TEA) is the sum of your best four scaled scores plus 10% of your best Languages Other than English (LOTE) scaled score and 10% of your Mathematics Methods and Mathematics Specialist scaled scores.",
      "You receive the LOTE and Mathematics bonuses even if those courses are not among your best four. Only your best LOTE scaled score counts for the LOTE bonus.",
      "The maximum TEA is 430, and you can accumulate the scaled scores that make up your TEA over five consecutive years.",
    ],
    modelNote:
      "Enter scaled scores out of 100 and mark LOTE, Mathematics Methods and Mathematics Specialist rows. The calculator adds TISC's 10% bonuses to your best four, then maps the result to an ATAR with a fixed planning curve — TISC's TEA-to-ATAR table changes every year.",
    source: {
      publisher: "Tertiary Institutions Service Centre (TISC)",
      title: "Australian Tertiary Admission Rank (ATAR)",
      href: "https://www.tisc.edu.au/static/guide/atar-about.tisc",
      checked: CHECKED,
    },
  },
  {
    slug: "sace",
    certificate: "SACE",
    region: "South Australia and the Northern Territory",
    centre: "SATAC",
    authority: "satac",
    subjects: [
      { name: "English", scaledScore: 74 },
      { name: "Mathematical Methods", scaledScore: 78 },
      { name: "Chemistry", scaledScore: 72 },
      { name: "Biology", scaledScore: 76 },
      { name: "Research Project", scaledScore: 70 },
    ],
    facts: [
      "SATAC calculates your university aggregate from the scaled scores of your best 90 credits: your best three 20-credit Tertiary Admissions Subjects (60 credits) plus the best result from a flexible option (30 credits).",
      "At least 60 of the 90 credits must come from 20-credit TAS or valid subject pairs (two 10-credit TAS from the same subject area). Recognised Studies can contribute at most 20 credits.",
      "The university aggregate is a score from 0 to 90.00. SATAC converts it to an ATAR using population data for 16–20-year-olds in South Australia and the Northern Territory, so the conversion changes every year.",
    ],
    modelNote:
      "Enter scaled results out of 100 (a 20-credit scaled score out of 20, multiplied by 5). The calculator models three 20-credit subjects plus an approximate 30-credit flexible option and shows the counted average only — SATAC advises against predicting an ATAR from simplified inputs.",
    source: {
      publisher: "South Australian Tertiary Admissions Centre (SATAC)",
      title: "ATAR",
      href: "https://www.satac.edu.au/atar",
      checked: CHECKED,
    },
  },
];

export const auAtarStateBySlug = Object.fromEntries(auAtarStates.map((s) => [s.slug, s])) as Record<
  AuAtarState["slug"],
  AuAtarState
>;
