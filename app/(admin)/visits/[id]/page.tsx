import VisitWrapper from "@/components/visits/wrapper";
import { VISITS_ENDPOINT } from "@/utilities/endpoints";

const getVisitData = (id: string) => {
  return {
    visit: {
      id: "V-12345",
      date: "April 27, 2025",
      time: "10:30 AM",
      status: "Completed",
      type: "Follow-up",
      duration: "30 minutes",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      location: "Main Hospital, Room 302",
      notes:
        "Patient reported improvement in symptoms. Continue current medication regimen.",
    },

    patient: {
      id: "P-5678",
      name: "Robert Anderson",
      age: 45,
      gender: "Male",
      dob: "05/12/1980",
      phone: "(555) 123-4567",
      email: "robert.anderson@example.com",
      address: "123 Main St, Anytown, CA 94123",
      insurance: "BlueCross Health Plan",
      insuranceId: "BC987654321",
    },
  };
};

export default async function VisitDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const paramsResponse = await params;
  const patient2 = await getVisitData(
    `${VISITS_ENDPOINT}${paramsResponse?.id}/`
  );
  const patient = getVisitData(params["id"]);
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex flex-col space-y-6">
        <VisitWrapper visitData={patient} />
      </div>
    </div>
  );
}
