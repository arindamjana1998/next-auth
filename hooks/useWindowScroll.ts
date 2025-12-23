"use client";
import { useState, useEffect } from "react";

export const useWindowScroll = () => {
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleScroll = () => {
                setScrollY(window.scrollY);
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, []);
    return scrollY;
};