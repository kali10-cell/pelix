"use client";

import { useEffect } from "react";
import { DEMO_PLAN_KEY } from "@/lib/demoSession";

export default function GuardarPlanCheckout({ checkout, planId }) {
  useEffect(() => {
    if (checkout === "success" && planId) {
      window.localStorage.setItem(DEMO_PLAN_KEY, planId);
    }
  }, [checkout, planId]);

  return null;
}
