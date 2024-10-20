import React from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@common/components/ui/accordion'

function Filter({ ...props }) {
    return (
        <Accordion type="single" defaultValue="item-1" collapsible {...props}>
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className="flex justify-between items-start">
                        <h1 className="text-xl px-4 font-bold">
                            Filter
                        </h1>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className='h-32'>

                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default function ProductFilters() {
    return (
        <div className="container max-w-sm ">
            <div className="divider"></div>
            <div className="my-4 overflow-auto">
                {/* FILTERS */}

                {
                    Array(3).fill().map((_, i) => (
                        <Filter key={i} />
                    ))
                }


            </div>
        </div>
    )
}
