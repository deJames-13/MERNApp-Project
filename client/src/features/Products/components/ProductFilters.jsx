import { Rating } from '@common';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@common/components/ui/accordion';
import {
    setCategoryFilter,
    setCategorySearch,
    setMaxRangeInput,
    setMinRangeInput,
    setPriceFilter,
    setRatingFilter,
} from '../product.slice';


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const priceRanges = [
    { label: 'Up to P5000', key: 'min' },
    { label: 'P5000 - P10000', key: 'mid' },
    { label: 'P10000 - P20000', key: 'high' },
    { label: 'Over P20000', key: 'max' },
];
const shoeCategories = [
    'Sneakers',
    'Boots',
    'Sandals',
    'Slippers',
    'Formal Shoes',
    'Men\'s Shoes',
    'Women\'s Shoes',
    'Kids\' Shoes'
];

function Filter({ title, children, ...props }) {
    return (
        <Accordion type="single" defaultValue="item-1" collapsible {...props}>
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <div className="flex justify-between items-start">
                        <h1 className="text-xl px-4 font-bold">
                            {title || 'Filter'}
                        </h1>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className='px-4'>
                        {children}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default function ProductFilters() {
    const dispatch = useDispatch();
    const { queries, filters, minRangeInput, maxRangeInput, categorySearch } = useSelector((state) => state.product);

    const handlePriceChange = (range) => {
        const updatedPrice = filters.price.includes(range)
            ? filters.price.filter((item) => item !== range)
            : [...filters.price, range];
        dispatch(setPriceFilter(updatedPrice));
    };

    const handleCategoryChange = (category) => {
        const updatedCategories = filters.categories.includes(category)
            ? filters.categories.filter((item) => item !== category)
            : [...filters.categories, category];
        dispatch(setCategoryFilter(updatedCategories));
    };

    const handleRatingChange = (rating) => {
        dispatch(setRatingFilter(rating));
    };

    const handleMinRangeInputChange = (e) => {
        dispatch(setMinRangeInput(e.target.value));
    };

    const handleMaxRangeInputChange = (e) => {
        dispatch(setMaxRangeInput(e.target.value));
    };

    const handleCategorySearchChange = (e) => {

        dispatch(setCategorySearch(e.target.value));
    };

    return (
        <div className="hidden container max-w-sm lg:block">
            <div className="divider"></div>
            <div className="my-4 overflow-auto">
                {/* FILTERS */}

                {/* PRICE */}
                <Filter title={"Price Range"}>
                    <div>
                        {priceRanges.map((range, index) => (
                            <div key={index} className="flex items-center justify-between py-2">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-sm checkbox-primary"
                                        checked={filters.price.includes(range.key)}
                                        onChange={() => handlePriceChange(range.key)}
                                    />
                                    <span className="ml-2">{range.label}</span>
                                </label>
                            </div>
                        ))}
                        <div className="divider"></div>
                        {/* Custom */}
                        <div className="flex items-center justify-between py-2">
                            <label className="flex items-center">
                                <span className="ml-2">Set Range</span>
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    className="input input-bordered input-sm w-16"
                                    value={minRangeInput}
                                    onChange={handleMinRangeInputChange}
                                />
                                <span className="mx-2">-</span>
                                <input
                                    type="text"
                                    className="input input-bordered input-sm w-16"
                                    value={maxRangeInput}
                                    onChange={handleMaxRangeInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </Filter>

                {/* CATEGORIES */}
                <Filter title={"Categories"}>
                    <label className="my-2 input input-bordered flex items-center gap-2">
                        <input
                            type="text"
                            className="grow"
                            placeholder="Search"
                            value={categorySearch}
                            onChange={handleCategorySearchChange}
                        />
                    </label>
                    <div className="divider"></div>

                    <div className="">
                        {shoeCategories.map((category, index) => (
                            <div key={index} className="flex items-center justify-between py-2">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-sm checkbox-primary"
                                        checked={filters.categories.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                    />
                                    <span className="ml-2">{category}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </Filter>

                {/* RATINGS */}
                <Filter title={"Ratings"}>
                    <div className="flex items-center text-lg gap-8">
                        <span>Filter By: </span>
                        <Rating value={filters.rating} onChange={handleRatingChange} />
                    </div>
                </Filter>
            </div>
        </div>
    );
}