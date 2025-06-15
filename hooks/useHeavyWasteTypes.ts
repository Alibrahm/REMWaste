import { useEffect, useState } from "react";
import { HeavyWasteType } from "@/types";

export function useHeavyWasteTypes() {
  const [heavyWasteTypes, setHeavyWasteTypes] = useState<HeavyWasteType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWasteTypes = async () => {
      try {
        const response = await fetch(
          "https://yozbrydxdlcxghkphhtq.supabase.co/rest/v1/waste_types?select=*&is_heavy=eq.true",
          {
            headers: {
              apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch heavy waste types.");
        }

        const data: HeavyWasteType[] = await response.json();
        setHeavyWasteTypes(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWasteTypes();
  }, []);

  return { heavyWasteTypes, isLoading, error };
}
