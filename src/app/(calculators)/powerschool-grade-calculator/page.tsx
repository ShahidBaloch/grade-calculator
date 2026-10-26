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
      <ContentPageLayout title="PowerSchool Grade Calculator" description={description} breadcrumbs={breadcrumbs}>
        <div className="not-prose my-6">
          <WeightedGradeCalculator storageKey="powerschool-grade-calculator" initialItems={powerSchoolCategories} />
        </div>
        <h2>How to use it with PowerSchool</h2>
        <ol>
          <li>In PowerSchool, open the class and find the grading categories and their weights.</li>
          <li>Enter each category&apos;s current average and weight above (or switch to points for points-based classes).</li>
          <li>Add the weight still to come to see what you need on the remaining work.</li>
        </ol>
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
