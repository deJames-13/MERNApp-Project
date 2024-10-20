import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@common/components/ui/pagination"

import React from 'react'

export function PaginationComponent({
    last = 10,
    current = 1,
    onChange = (page) => { },
    ...props
}) {
    const [page, setPage] = React.useState(current)

    const handleClick = (page) => () => {
        setPage(page)
        onChange(page)
    }
    const handlePrevious = () => {
        if (page <= 1) return
        setPage(page - 1)
        onChange(page)
    }
    const handleNext = () => {
        if (page >= last) return
        setPage(page + 1)
        onChange(page)
    }

    const handleSkipNext = () => {
        if (page >= last) return
        setPage(page + 3)
        onChange(page)
    }

    const handleSkipPrevious = () => {
        if (page <= 1) return
        setPage(page - 3)
        onChange(page)
    }



    return last > 1 ? (
        <Pagination className="cursor-pointer select-none">
            <PaginationContent className="w-full">

                {/* Prev */}
                <PaginationPrevious className={`mr-auto ${page === 1 ? 'btn-disabled' : ''}`} onClick={handlePrevious} />

                {/* Start */}
                <PaginationItem>
                    <PaginationLink
                        className={`text-base-content hover:bg-secondary ${page === 1 ? 'bg-primary' : ''}`}
                        onClick={handleClick(1)}>1
                    </PaginationLink>
                </PaginationItem>


                {/* Pages */}
                {page > 3 && <PaginationEllipsis onClick={handleSkipPrevious} />}


                {/* Before */}
                {page > 2 && <PaginationItem>
                    <PaginationLink
                        className={`text-base-content hover:bg-secondary`}
                        onClick={handleClick(page - 1)}>{page - 1}
                    </PaginationLink>
                </PaginationItem>}


                {/* Current */}
                {page !== 1 && page !== last && <PaginationItem>
                    <PaginationLink
                        className={`text-base-content hover:bg-secondary bg-primary`}
                        onClick={handleClick(page)}>
                        {page}
                    </PaginationLink>
                </PaginationItem>}


                {/* After */}
                {page < last - 1 && <PaginationItem>
                    <PaginationLink
                        className={`text-base-content hover:bg-secondary `}
                        onClick={handleClick(page + 1)}>{page + 1}
                    </PaginationLink>
                </PaginationItem>}


                {/* End */}
                {page < last - 2 && <PaginationEllipsis onClick={handleSkipNext} />}


                {/* Last */}
                {last > 1 && <PaginationItem>
                    <PaginationLink
                        className={`text-base-content hover:bg-secondary ${page === last ? 'bg-primary' : ''}`}
                        onClick={handleClick(last)} >{last}
                    </PaginationLink>
                </PaginationItem>}



                {/* Next */}
                <PaginationNext className="ml-auto" onClick={handleNext} disabled={page === last} />
            </PaginationContent>
        </Pagination>

    ) : <></>
}



