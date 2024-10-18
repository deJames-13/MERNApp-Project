import Autoplay from "embla-carousel-autoplay"
import * as React from "react"

import { Card, CardContent } from "@common/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@common/components/ui/carousel"

const defaults = [
    {
        src: "https://placehold.co/400",
        alt: "n/a",
    },
]

export function CarouselComponent({ images = defaults }) {
    images = images.length ? images : defaults
    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )

    return (
        <div className="mx-12">
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-2 ">
                                        <img className="rounded  aspect-square object-contain" src={image.src} alt={image.alt} />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {
                    images.length > 1 && <>
                        <CarouselPrevious
                            className="text-black"
                        />
                        <CarouselNext
                            className="text-black"
                        />
                    </>
                }
            </Carousel>
        </div>
    )
}
