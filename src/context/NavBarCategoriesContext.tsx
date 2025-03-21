import { createContext, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import supabase from "../config/supabase";

// Context creation
const NavBarCategoriesContext = createContext<{ categories: any[]; isLoading: boolean }>({
  categories: [],
  isLoading: true,
});

// Provider Component
export function CategoriesProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select();
      if (error) throw error;
      return data || [];
    },
  });

  // Memoize categories to prevent unnecessary re-renders
  const value = useMemo(() => ({ categories: data ?? [], isLoading }), [data, isLoading]);

  return <NavBarCategoriesContext.Provider value={value}>{children}</NavBarCategoriesContext.Provider>;
}

// Hook to access categories
export function useCategories() {
  return useContext(NavBarCategoriesContext);
}
