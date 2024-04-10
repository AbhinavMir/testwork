import Link from "next/link"
import { Avatar } from "@/components/ui/avatar"

export function Landing() {
  return (
    <>
      <div className="bg-gray-50 py-6 lg:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] 2xl:text-7xl/none bg-black">
                Calculate your Gold Card ratio with confidence.
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                GoldCardTest is the trusted platform for healthcare providers to accurately calculate their Gold Card
                ratio, ensuring compliance and maximizing reimbursements. Our intuitive tools and expert support make
                the process seamless, saving you time and resources.
              </p>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="#"
              >
                Get Started
              </Link>
            </div>
         
          </div>
        </div>
      </div>
    
      <div className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 dark:text-gray-400">Have a question? We&apos;ve got the answers you need.</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">How does GoldCardTest calculate the Gold Card ratio?</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  GoldCardTest uses a proprietary algorithm to analyze the patient data provided by the healthcare
                  provider. Our system cross-references the information with the latest regulatory requirements to
                  ensure accurate calculations.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Is the patient data entered into GoldCardTest secure?</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Yes, we take data security and patient privacy very seriously. GoldCardTest complies with the highest
                  standards of encryption and confidentiality. The patient data entered into our system is encrypted and
                  stored in secure, HIPAA-compliant servers.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Can GoldCardTest help my practice maximize reimbursements?</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Absolutely. By ensuring accurate calculations of the Gold Card ratio, GoldCardTest helps healthcare
                  providers identify opportunities for maximizing reimbursements. Our platform provides insights that
                  can lead to improved financial performance and compliance with regulatory requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
