"use client";

import { useState, useEffect } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from "react-icons/hi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  onItemsPerPageChange,
}: PaginationProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = isMobile ? 3 : 5;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    if (currentPage > 3) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const PaginationButton = ({
    onClick,
    disabled,
    children,
    className = "",
    active = false,
  }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md border text-xs sm:text-sm transition-colors flex-shrink-0
        focus:outline-none focus:ring-2 focus:ring-[var(--hot-pink)] focus:ring-offset-2
        ${
          active
            ? "border-[var(--hot-pink)] bg-[var(--hot-pink)] text-white"
            : "border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full max-w-full border-t border-border pt-6">
      <div className="mb-4 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
        {onItemsPerPageChange && (
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="whitespace-nowrap">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-[var(--hot-pink)] focus:ring-offset-2 sm:px-3"
            >
              {[8, 16, 24, 32].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
            <span className="whitespace-nowrap text-xs sm:text-sm">
              per page
            </span>
          </div>
        )}

        <div className="text-center text-xs text-gray-300 sm:text-left sm:text-sm">
          Showing <span className="font-medium text-white">{startItem}</span> to{" "}
          <span className="font-medium text-white">{endItem}</span> of{" "}
          <span className="font-medium text-white">{totalItems}</span> entries
        </div>
      </div>

      <div className="flex w-full items-center justify-center gap-2 overflow-x-auto p-1">
        <PaginationButton
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="hidden sm:flex"
        >
          <HiChevronDoubleLeft className="h-4 w-4" />
        </PaginationButton>

        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <HiChevronLeft className="h-4 w-4" />
        </PaginationButton>

        {pageNumbers.map((page, idx) =>
          typeof page === "number" ? (
            <PaginationButton
              key={page}
              onClick={() => onPageChange(page)}
              active={page === currentPage}
            >
              {page}
            </PaginationButton>
          ) : (
            <span
              key={`ellipsis-${idx}`}
              className="flex h-8 w-8 items-center justify-center text-muted-foreground"
            >
              ...
            </span>
          )
        )}

        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <HiChevronRight className="h-4 w-4" />
        </PaginationButton>

        <PaginationButton
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="hidden sm:flex"
        >
          <HiChevronDoubleRight className="h-4 w-4" />
        </PaginationButton>
      </div>
    </div>
  );
};

export default Pagination;
