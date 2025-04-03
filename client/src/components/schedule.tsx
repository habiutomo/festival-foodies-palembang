import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";

export default function Schedule() {
  const { t, currentLang } = useLanguage();
  
  const { data, isLoading } = useQuery({
    queryKey: ["/api/events"],
  });
  
  const events = data?.events || [];
  
  return (
    <section id="schedule" className="container mx-auto px-4 py-8 bg-neutral-100 rounded-xl">
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="font-heading text-2xl font-bold">{t("festivalSchedule")}</h2>
        <p className="text-neutral-600">{t("programEvents")}</p>
      </div>
      
      {isLoading ? (
        <div className="bg-white rounded-xl shadow-sm p-8 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] bg-white rounded-xl shadow-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="py-4 px-6 text-left text-neutral-600 font-medium">{t("date")}</th>
                <th className="py-4 px-6 text-left text-neutral-600 font-medium">{t("time")}</th>
                <th className="py-4 px-6 text-left text-neutral-600 font-medium">{t("event")}</th>
                <th className="py-4 px-6 text-left text-neutral-600 font-medium">{t("location")}</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr 
                  key={event.id} 
                  className={`border-b border-neutral-100 hover:bg-neutral-50 ${index === events.length - 1 ? '' : 'border-b'}`}
                >
                  <td className="py-4 px-6 font-medium">{event.date}</td>
                  <td className="py-4 px-6">{event.startTime} - {event.endTime}</td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium">{currentLang === "id" ? event.title : event.titleEn}</p>
                      <p className="text-sm text-neutral-600">{currentLang === "id" ? event.description : event.descriptionEn}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">{event.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="flex justify-center mt-6">
        <Button 
          className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 flex items-center gap-2"
        >
          <Calendar className="h-4 w-4" />
          <span>{t("downloadFullSchedule")}</span>
        </Button>
      </div>
    </section>
  );
}
