"use client"

import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"
import { Card, CardContent } from "./ui/card"
import testimonials from "@/app/data/testimonials.json"

const TestimonialCarousel = () => {
    return (
    <>
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12 mt-24">What Our Writers Say</h2>
        <Carousel plugins={[Autoplay({ delay: 2000 })]}>
            <CarouselContent>
                {testimonials.map((testimonial, index) =>
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <Card>
                            <CardContent>
                                <blockquote className="space-y-4">
                                    <p className="text-lg font-medium text-blue-500 italic">&quot;{testimonial.text}&quot;</p>
                                    <footer>
                                        <div className="text-sm text-gray-900">
                                            {testimonial.author}
                                        </div><div className="text-sm text-blue-900">
                                            {testimonial.role}
                                        </div>
                                    </footer>
                                </blockquote>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                )}
            </CarouselContent>
        </Carousel>
    </>
    )
}

export default TestimonialCarousel
