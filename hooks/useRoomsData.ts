"use client";

import { useState, useEffect, useCallback } from "react";
import { RoomDataInterface } from "@/interface/room.interface";
import { FilterStateInterface } from "@/components/common/FilterBar";
import { useLocationFilter } from "@/hooks/useLocationFilter";
import { useSessionStorage } from "@/hooks/useSessionStorage";

interface UseRoomsDataProps {
  fetcher: (query: string) => Promise<any>;
  paginationKeyPrefix?: string;
  enabled?: boolean;
  roomActiveStatus?: "active" | "inactive" | "deleted";
}

export const useRoomsData = ({
  fetcher,
  paginationKeyPrefix = "home",
  enabled = true,
  roomActiveStatus,
}: UseRoomsDataProps) => {
  const { selectedLocation, isInitialized: isLocationInitialized } =
    useLocationFilter("all");

  // State
  const filterKey = paginationKeyPrefix
    ? `${paginationKeyPrefix}_filtersState`
    : "filtersState";

  const [filters, setFilters, isFiltersInitialized] =
    useSessionStorage<FilterStateInterface>(filterKey, {
      type: "pg",
      gender: "all",
      status: "active",
      query: "",
    });

  const [roomData, setRoomData] = useState<RoomDataInterface[]>([]);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  const pageKey = paginationKeyPrefix ? `${paginationKeyPrefix}_page` : "page";
  const limitKey = paginationKeyPrefix
    ? `${paginationKeyPrefix}_items_per_page`
    : "items_per_page";

  const [currentPage, setCurrentPage, isCurrentPageInitialized] =
    useSessionStorage(pageKey, 1);
  const [itemsPerPage, setItemsPerPage, isItemsPerPageInitialized] =
    useSessionStorage(limitKey, 8);

  const totalPages = Math.ceil(totalItemsCount / itemsPerPage);

  // API Call
  const fetchRooms = useCallback(async () => {
    if (!enabled) return;

    const queryParams = new URLSearchParams({
      status: roomActiveStatus || filters.status || "active",
      page: currentPage.toString(),
      limit: itemsPerPage.toString(),
    });

    if (filters.query.trim()) queryParams.set("title", filters.query.trim());

    if (filters.type) {
      // Mapping as per requirements
      queryParams.set("rentType", filters.type === "pg" ? "PG" : "Room");

      if (filters.type === "pg" && filters.gender !== "all") {
        queryParams.set(
          "roomType",
          filters.gender === "male" ? "Male" : "Female"
        );
      }
    }

    if (selectedLocation && selectedLocation !== "all") {
      queryParams.set("location", selectedLocation);
    }

    try {
      const response = await fetcher(queryParams.toString());
      if (response) {
        setRoomData(response?.items || []);
        setTotalItemsCount(response?.pagination?.totalRecords || 0);
      } else {
        setRoomData([]);
        setTotalItemsCount(0);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRoomData([]);
    }
  }, [fetcher, currentPage, itemsPerPage, filters, selectedLocation, enabled]);

  // Handlers
  const handleFilterChange = useCallback(
    (newFilters: FilterStateInterface) => {
      setFilters((prev) => {
        const hasFiltersChanged =
          JSON.stringify(prev) !== JSON.stringify(newFilters);
        if (hasFiltersChanged) {
          setCurrentPage(1);
          return newFilters;
        }
        return prev;
      });
    },
    [setFilters, setCurrentPage]
  );

  useEffect(() => {
    if (
      enabled &&
      isFiltersInitialized &&
      isCurrentPageInitialized &&
      isItemsPerPageInitialized &&
      isLocationInitialized
    ) {
      fetchRooms();
    }
  }, [
    fetchRooms,
    enabled,
    isFiltersInitialized,
    isCurrentPageInitialized,
    isItemsPerPageInitialized,
    isLocationInitialized,
  ]);

  return {
    roomData,
    totalItemsCount,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    filters,
    handleFilterChange,
    isFiltersInitialized,
    fetchRooms,
    selectedLocation,
  };
};
