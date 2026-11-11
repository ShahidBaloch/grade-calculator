import { AppLink as Link } from "@/components/navigation/AppLink";
import { ContentPageLayout } from "@/components/content/ContentPageLayout";
import { WeightedGradeCalculator, type WeightedRow } from "@/components/calculators/WeightedGradeCalculator";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata } from "@/lib/seo/metadata";
import { faqPageJsonLd, webApplicationJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { absoluteUrl } from "@/config/site";

const path = "/powerschool-grade-calculator";
const title = "PowerSchool Grade Calculator — Check Your Class Grade";
const description =
  "Free PowerSchool grade calculator. Enter your PowerSchool category weights and scores to check your class grade and see what you need next.";

/** Common US high school PowerSchool categories. */
const powerSchoolCategories: WeightedRow[] = [
  { name: "Tests", score: 82, weight: 40, maxPoints: 100 },
  { name: "Quizzes", score: 88, weight: 30, maxPoints: 100 },
  { name: "Homework", score: 96, weight: 20, maxPoints: 100 },
  { name: "Classwork", score: 92, weight: 10, maxPoints: 100 },
];

const faqs = [
  {
    question: "Can I calculate my PowerSchool grade myself?",
    answer:
      "Yes. Open the class in PowerSchool, note each category (for example tests, quizzes, homework) and its weight, then enter your average in each category here. If the class is points-based, switch to points and enter total earned and possible.",
  },
  {
    question: "Why doesn't my calculation match PowerSchool exactly?",
    answer:
      "Districts configure PowerSchool differently: some drop the lowest score, exclude missing or exempt assignments, or round at each step. Check the class grading setup or ask the teacher if your number is off by more than a point.",
  },
  {
    question: "How does PowerSchool calculate a weighted grade?",
    answer:
      "For a category-weighted class, PowerSchool averages the scores inside each category, multiplies each category average by its weight, and divides by the total weight of the categories that have grades so far. Categories with no grades yet are left out, which is why one early test can move your grade a lot.",
  },
  {
    question: "What grade do I need on the next test in PowerSchool?",
    answer:
      "Enter your current category averages above, then add the test as a new row with its category weight. Change its score until the overall grade reaches your target — that score is what you need. For a final exam worth a fixed percentage, the final grade calculator does this in one step.",
  },
  {
    question: "Why is my PowerSchool grade different on the mobile app?",
    answer:
      "The app and the website read the same gradebook, but the app may show a stored grade that updates on a schedule, while the website shows the teacher's current calculation. If they disagree, trust the version your teacher points you to, and refresh after new scores are posted.",
  },
  {
    question: "Where do I find my GPA in PowerSchool?",
    answer:
      "It depends on your district's settings. See the PowerSchool GPA guide for where it usually appears and how to calculate it yourself if it is hidden.",
  },
];

export const metadata = createPageMetadata({
  title,
  description,
  path,
  languages: { "x-default": absoluteUrl(path), en: absoluteUrl(path) },
  keywords: ["powerschool grade calculator", "powerschool calculator", "powerschool grades calculator", "calculate grade powerschool"],
});

export default function PowerSchoolGradeCalculatorPage() {
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Calculators", href: "/calculators" },
    { name: "PowerSchool Grade Calculator", href: path },
  ];
  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <JsonLd data={webPageJsonLd({ name: title, description, path })} />
      <JsonLd data={webApplicationJsonLd({ name: "PowerSchool Grade Calculator", description, path })} />
      <JsonLd data={faqPageJsonLd(faqs)} />
      <ContentPageLayout title="PowerSchool Grade Calculator" description={description} breadcrumbs={breadcrumbs} richText>
        <div className="not-prose my-6">
          <WeightedGradeCalculator storageKey="powerschool-grade-calculator" initialItems={powerSchoolCategories} />
        </div>
        <h2>How to use it with PowerSchool</h2>
        <ol>
          <li>In PowerSchool, open the class and find the grading categories and their weights.</li>
          <li>Enter each category&apos;s current average and weight above (or switch to points for points-based classes).</li>
          <li>Add the weight still to come to see what you need on the remaining work.</li>
        </ol>
        <h2>Category weights vs total points</h2>
        <p>
          PowerSchool classes are set up in one of two ways. In a <strong>category-weighted</strong> class, each
          category (tests, quizzes, homework) has a fixed share of the grade, such as 40%, 30%, 20% and 10%, no
          matter how many assignments it holds. In a <strong>total-points</strong> class, every assignment&apos;s
          points are added together, so a 100-point test counts five times as much as a 20-point quiz. Your class
          page in PowerSchool shows which method the teacher uses; pick the matching mode in the calculator above.
        </p>
        <h2>Worked example</h2>
        <p>
          With the sample scores loaded above — tests 82% (40%), quizzes 88% (30%), homework 96% (20%) and classwork
          92% (10%) — the class grade is 0.40 × 82 + 0.30 × 88 + 0.20 × 96 + 0.10 × 92 = 32.8 + 26.4 + 19.2 + 9.2 =
          87.6%, a B+ on the common plus/minus scale. Raising the test average to 90% would lift the class grade to
          90.8%, because tests carry the most weight.
        </p>
        <h2>Tips for reading your PowerSchool grade</h2>
        <ul>
          <li>Missing assignments often count as zero until they are turned in, so one missing item can drop a category sharply.</li>
          <li>Exempt or excused assignments are left out of the average entirely.</li>
          <li>Teachers may drop the lowest score in a category, which you can mirror by leaving that score out here.</li>
          <li>Term grades (Q1, S1) and the final course grade can use different weights; check the class&apos;s grading setup.</li>
        </ul>
        <p>
          GradCalc is not affiliated with PowerSchool. Your teacher&apos;s gradebook settings decide the official grade.
        </p>
        <h2>Frequently asked questions</h2>
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
        <h2>Related</h2>
        <ul>
          <li><Link href="/guides/how-to-check-gpa-on-powerschool">How to check your GPA on PowerSchool</Link></li>
          <li><Link href="/high-school-gpa-calculator">High school GPA calculator</Link></li>
          <li><Link href="/final-grade-calculator">Final grade calculator</Link></li>
          <li><Link href="/canvas-grade-calculator">Canvas grade calculator</Link></li>
        </ul>
      </ContentPageLayout>
    </>
  );
}
