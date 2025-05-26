import React, { useState, ReactNode } from 'react';
import './Accordion.css';

type AccordionItem = {
    title: string;
    content: ReactNode;
};

type AccordionProps = {
    items: AccordionItem[];
    allowMultipleOpen?: boolean;
};

export const Accordion: React.FC<AccordionProps> = ({
                                                        items,
                                                        allowMultipleOpen = false,
                                                    }) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggleItem = (index: number) => {
        setOpenIndexes((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : allowMultipleOpen
                    ? [...prev, index]
                    : [index]
        );
    };

    return (
        <div className="accordion">
            {items.map((item, index) => {
                const isOpen = openIndexes.includes(index);

                return (
                    <div key={index} className="accordion__item">
                        <button
                            className="accordion__title"
                            onClick={() => toggleItem(index)}
                        >
                            {item.title}
                            <span
                                className={`accordion__arrow ${
                                    isOpen ? 'accordion__arrow--open' : ''
                                }`}
                            >
                ▼
              </span>
                        </button>
                        <div
                            className={`accordion__content ${
                                isOpen ? 'accordion__content--open' : ''
                            }`}
                        >
                            {isOpen && <div>{item.content}</div>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
