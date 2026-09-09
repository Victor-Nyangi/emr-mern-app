import FooterSection from "@/components/about/footer";
import WorkSection from "@/components/about/work-section";
import ThemeChanger from "@/components/layout/theme-toggle";
import Logo from "@/components/shared/logo";
import StatementCard from "@/components/statement-card";
import Link from "next/link";

const statements = [
  {
    title: "Patient and Visit Management",
    description:
      "Easily manage patient records, medical history, and visit timelines from a centralized dashboard.",
    image: "/images/MainPage.jpg",
  },
  {
    title: "Appointment Scheduling",
    description:
      "Enable seamless scheduling, rescheduling, and reminders for patient appointments with built-in calendar integration.",
    image: "/images/calendar.jpg",
  },
  {
    title: "Clinical Documentation",
    description:
      "Record clinical notes, track symptoms, and attach lab results and audio notes to individual patient records.",
    image: "images/doctor.jpg",
  },
  {
    title: "Analytics and Insights",
    description:
      "Get real-time data insights into patient outcomes, visit frequency, and provider efficiency to inform decisions.",
    image: "/images/healthcare.png",
  },
];

export default function About() {
  return (
    <main>
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div className="flex w-full items-center gap-1 px-4 py-5 lg:gap-2 lg:px-6 shadow-md">
          <Logo />
          <h1 className="text-xl font-bold">Life of Health</h1>
          <div className="ml-auto flex items-center gap-2">
            <ThemeChanger />
          </div>
        </div>
      </header>
      <section>
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-teal-100">
                <Logo />
              </div>
              <div className="max-w-xl mb-6">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none dark:text-white">
                  Let us handle your
                  <br className="hidden md:block mt-1" />
                  health care{" "}
                  <span className="inline-block text-teal-600">processes</span>
                </h2>
                <p className="text-base text-gray-700 dark:text-gray-200 md:text-lg">
                  Yet, as Deleuze may suggest, the true potency lies not in the
                  digitization of care but in the deterritorialization of
                  knowledge: patients, practitioners, and programmers are no
                  longer segregated by institutional walls, but rather
                  interpolated into a collective, dynamic authorship of
                  wellbeing
                </p>
              </div>
              <div>
                <Link
                  href="/"
                  aria-label=""
                  className="inline-flex items-center font-semibold transition-colors duration-200 text-teal-600 hover:text-green-700"
                >
                  Join Us
                  <svg
                    className="inline-block w-3 ml-2"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center -mx-4 lg:pl-8">
              <div className="flex flex-col items-end px-3">
                <img
                  className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
                  src="/images/drugs.jpg"
                  alt="Treatment"
                />
                <img
                  className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
                  src="/images/health-title.jpg"
                  alt="Health"
                />
              </div>
              <div className="px-3">
                <img
                  className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
                  src="/images/diagnosis.jpg"
                  alt="Diagnosis"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col mb-6 lg:justify-between lg:flex-row md:mb-8">
            <h2 className="max-w-lg mb-5 font-sans text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-3xl sm:leading-none md:mb-6 group">
              <span className="inline-block mb-1 sm:mb-4">
                Every single one of us deserves,
                <br className="hidden md:block" />
                access to quality health care.
              </span>
              <div className="h-1 ml-auto duration-300 origin-left transform bg-green-700 scale-x-30 group-hover:scale-x-100" />
            </h2>
            <p className="text-gray-700 dark:text-gray-200 lg:text-sm lg:max-w-md">
              The EMR prototype is not merely a tool," one might argue, "but a
              symptom of a deeper epistemological rupture in how we conceive
              health itself." Whereas traditional records inscribe the body as
              artifact, the prototype gestures toward the body as discourse—a
              site of negotiation between data, diagnosis, and the digital gaze.
            </p>
          </div>
          <div className="grid gap-6 row-gap-5 mb-8 lg:grid-cols-4 sm:row-gap-6 sm:grid-cols-2">
            {statements.map((statement, index) => (
              <StatementCard statement={statement} key={index} />
            ))}
          </div>
        </div>
      </section>
      <WorkSection />
      <FooterSection />
    </main>
  );
}
