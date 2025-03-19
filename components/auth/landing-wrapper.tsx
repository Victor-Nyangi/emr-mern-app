export default function LandingWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative w-full h-screen">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 bg-[url('/images/MainPage.jpg')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-20 flex flex-col h-full flex min-h-svh w-full">
          <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full md:px-24">
            <div className="relative flex grid items-center grid-cols-2">
              <a
                href="/"
                aria-label="Company"
                title="Company"
                className="inline-flex items-center"
              >
                <svg
                  className="w-8 text-teal-400"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  stroke="currentColor"
                  fill="none"
                >
                  <rect x="3" y="1" width="7" height="12" />
                  <rect x="3" y="17" width="7" height="6" />
                  <rect x="14" y="1" width="7" height="6" />
                  <rect x="14" y="11" width="7" height="12" />
                </svg>
                <span className="ml-2 text-xl font-bold tracking-wide text-white uppercase">
                  Life of Health
                </span>
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-4 py-16 mx-auto sm:max-w-xl h-full flex md:max-w-full md:px-24  items-center justify-center ">
            <div className="flex flex-col items-center justify-between sm:flex-row">
              <div className="w-full max-w-xl mb-12 sm:mb-0 sm:pr-16 sm:w-7/12">
                <h1 className="max-w-lg mb-6 font-sans text-4xl font-bold text-white">
                  Electronic <br className="hidden md:block" />
                  Management <span className="text-teal-400">Records</span>
                </h1>
                <p className="max-w-xl mb-4 text-base text-gray-300 md:text-lg">
                  Contains notes and information collected by and for the
                  clinicians in that office, clinic, or hospital and are mostly
                  used by providers for diagnosis and treatment.
                </p>
                <a
                  href="/"
                  aria-label=""
                  className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-400 hover:text-teal-300"
                >
                  Learn more
                  <svg
                    className="inline-block w-3 ml-2"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                  </svg>
                </a>
              </div>

              {/* Main Content */}
              <div className="max-w-xl sm:px-8 sm:w-5/12 mb-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
