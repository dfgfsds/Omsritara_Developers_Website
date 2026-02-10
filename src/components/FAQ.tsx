"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-300">
            <button
                className="w-full flex items-center justify-between p-4 md:p-5 text-left focus:outline-none"
                onClick={onClick}
            >
                <span className="text-base font-semibold text-gray-900">{question}</span>
                <div className={`p-1 rounded-full transition-colors ${isOpen ? 'bg-[#9b0000] text-white' : 'bg-gray-100 text-black'}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </div>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 pb-5 px-5" : "max-h-0 opacity-0"
                    }`}
            >
                <p className="text-gray-700 text-base">
                    {answer}
                </p>
            </div>
        </div>
    );
};

export default function FAQ({ faqs }: { faqs: { question: string; answer: string }[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!faqs || faqs.length === 0) return null;

    return (
        <div className="">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Frequently Asked Questions
                </h2>
                {/*<div className="h-1.5 w-20 bg-[#9b0000] mt-3 rounded-full"></div>*/}
            </div>

            <div className="grid grid-cols-1 gap-4">
                {faqs.map((faq, index) => (
                    <FAQItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={openIndex === index}
                        onClick={() => setOpenIndex(index === openIndex ? null : index)}
                    />
                ))}
            </div>
        </div>
    );
}
