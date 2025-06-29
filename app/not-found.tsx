import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                <Image
                  src="/images/healthcare.png"
                  alt="Healthcare"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold text-gray-900 mb-2">
              Page Not Found
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              The page you're looking for doesn't exist or has been moved.
            </CardDescription>
          </CardHeader>
          
          <Separator className="mx-6 mb-6" />
          
          <CardContent className="space-y-6">
            <div className="text-8xl font-bold text-blue-600 mb-4">
              404
            </div>
            
            <p className="text-gray-600 max-w-md mx-auto">
              We apologize for the inconvenience. The page you requested could not be found. 
              Please check the URL or navigate back to our main page.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/">
                  Return to Home
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link href="/appointments">
                  Go to Appointments
                </Link>
              </Button>
            </div>
            
            <div className="flex justify-center items-center space-x-4 pt-6">
              <div className="relative w-16 h-16 opacity-60">
                <Image
                  src="/images/doctor.jpg"
                  alt="Doctor"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div className="relative w-16 h-16 opacity-60">
                <Image
                  src="/images/calendar.jpg"
                  alt="Calendar"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div className="relative w-16 h-16 opacity-60">
                <Image
                  src="/images/drugs.jpg"
                  alt="Medication"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default NotFound