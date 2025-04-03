import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "./ui/icon";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";
import type { Event } from "@shared/schema";

interface FestivalScheduleProps {
  events: Event[];
  isLoading: boolean;
  isLangId: boolean;
}

export default function FestivalSchedule({ events, isLoading, isLangId }: FestivalScheduleProps) {
  const { t } = useTranslation(isLangId);
  const [currentDay, setCurrentDay] = useState("Jumat, 10 November");
  
  // Group events by day
  const days = [...new Set(events.map(event => event.day))];
  const filteredEvents = events.filter(event => event.day === currentDay);
  
  const getBgColorByIconType = (iconType: string) => {
    switch (iconType) {
      case 'primary': return 'bg-primary';
      case 'secondary': return 'bg-secondary';
      case 'accent': return 'bg-amber-400';
      default: return 'bg-primary';
    }
  };
  
  return (
    <section id="jadwal" className="py-10 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="font-montserrat font-bold text-2xl md:text-3xl text-dark">
            {t("schedule.title")}
          </h2>
          <p className="text-gray-700 mt-2">{t("schedule.subtitle")}</p>
        </div>
        
        <Card className="overflow-hidden">
          {/* Date tabs */}
          <div className="flex overflow-x-auto border-b border-gray-200">
            {isLoading ? (
              <div className="flex p-4 space-x-4 w-full">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-10 w-40" />
              </div>
            ) : (
              days.map((day) => (
                <Button
                  key={day}
                  variant="ghost"
                  className={cn(
                    "px-6 py-4 font-montserrat font-medium whitespace-nowrap border-b-2",
                    currentDay === day 
                      ? "border-primary text-primary" 
                      : "border-transparent hover:text-primary"
                  )}
                  onClick={() => setCurrentDay(day)}
                >
                  {day}
                </Button>
              ))
            )}
          </div>
          
          {/* Schedule Timeline */}
          <CardContent className="p-6">
            {isLoading ? (
              <div className="space-y-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="relative pl-8 pb-8 border-l-2 border-gray-200">
                    <Skeleton className="absolute left-[-8px] top-0 w-4 h-4 rounded-full" />
                    <div className="bg-gray-50 rounded-lg p-4">
                      <Skeleton className="h-6 w-4/5 mb-2" />
                      <Skeleton className="h-4 w-1/3 mb-3" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-4/5 mb-2" />
                      <Skeleton className="h-4 w-1/4 mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {filteredEvents.map((event, index) => (
                  <div 
                    key={event.id} 
                    className={cn(
                      "relative pl-8 border-l-2 border-gray-200",
                      index !== filteredEvents.length - 1 ? "pb-8" : ""
                    )}
                  >
                    <div className={cn(
                      "absolute left-[-8px] top-0 w-4 h-4 rounded-full border-2 border-white",
                      getBgColorByIconType(event.iconType)
                    )}></div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                        <h3 className="font-montserrat font-semibold text-lg text-dark">{event.name}</h3>
                        <div className="flex items-center text-primary font-medium mt-1 sm:mt-0">
                          <Icon name="clock" className="mr-2" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-gray-700 mb-3">
                        <Icon name="map-pin" className="mr-2 text-primary" />
                        <span>{event.location}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{event.description}</p>
                      
                      <div className="flex">
                        <Button 
                          variant="link" 
                          className="text-secondary font-medium hover:text-primary flex items-center p-0"
                        >
                          <span>{t("schedule.event_details")}</span>
                          <Icon name="arrow-right" className="ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredEvents.length === 0 && (
                  <div className="text-center py-10">
                    <Icon name="calendar-x" className="mx-auto text-4xl text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-700 mb-2">
                      {t("schedule.no_events")}
                    </h3>
                    <p className="text-gray-600">
                      {t("schedule.check_other_days")}
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
