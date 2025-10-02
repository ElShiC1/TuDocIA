"use client";

import { useEffect } from "react";

export default function FetchOnly(token: string | null = null) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('token fetch', token)
        const rest =await fetch("http://localhost:3000/api", {
          method: "POST",
          headers: {
            "x-token-api": token || "AIzaSyDZ4t4xLaN0uhdB6VCwQvwLsubkZdHIESM",
          },
        });
        console.log('response fetch', rest)
      } catch (err) {
        console.error("Error en fetch:", err);
      }
    };

    fetchData();
  }, []);

  return null; // No renderiza nada
}
