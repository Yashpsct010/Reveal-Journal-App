import faqs from "@/app/data/faqs.json"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

const Faqs = () => {
  return (
    <>
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12 mt-24">
            Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full mx-auto">
            {faqs.map((faq, index) => (
                <AccordionItem key={index} value={faq.q}>
                    <AccordionTrigger className="text-blue-900 text-lg cursor-pointer">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-blue-500">{faq.a}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    </>
  )
}

export default Faqs
