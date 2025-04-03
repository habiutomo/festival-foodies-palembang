import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { BookOpen, Check } from "lucide-react";

export default function CulinaryStory() {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <h2 className="font-heading text-2xl font-bold mb-4">{t("culinaryJourney")}</h2>
          <div className="prose max-w-none">
            <p className="text-neutral-700 leading-relaxed mb-4">
              {t("culinaryStoryP1")}
            </p>
            
            <p className="text-neutral-700 leading-relaxed mb-4">
              {t("culinaryStoryP2")}
            </p>
            
            <p className="text-neutral-700 leading-relaxed">
              {t("culinaryStoryP3")}
            </p>
          </div>
          
          <div className="mt-6">
            <Button 
              variant="secondary"
              className="px-6 py-3 bg-secondary text-neutral-800 rounded-lg font-medium hover:bg-secondary/90 flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              <span>{t("readMore")}</span>
            </Button>
          </div>
        </div>
        
        <div className="md:w-1/2">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg h-40">
                <img 
                  src="https://images.unsplash.com/photo-1625867113242-e2dcf1a8a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Pempek" 
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="overflow-hidden rounded-lg h-40">
                <img 
                  src="https://images.unsplash.com/photo-1644982647711-9129d2ed7ceb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Tekwan" 
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="overflow-hidden rounded-lg h-40">
                <img 
                  src="https://images.unsplash.com/photo-1618476636473-f1a5d0bfd80e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Mie Celor" 
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <div className="overflow-hidden rounded-lg h-40">
                <img 
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80" 
                  alt="Martabak HAR" 
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-neutral-100 rounded-lg">
              <h3 className="font-heading font-bold">{t("interestingFacts")}</h3>
              <ul className="mt-2 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span>{t("fact1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span>{t("fact2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-1" />
                  <span>{t("fact3")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
