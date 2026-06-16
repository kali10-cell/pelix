"use client";

import { useEffect } from "react";
import { DEMO_PLAN_KEY, DEMO_USER_KEY } from "@/lib/demoSession";

export default function GuardarPlanCheckout({ checkout, planId }) {
  useEffect(() => {
    if (checkout === "success" && planId) {
      window.localStorage.setItem(DEMO_PLAN_KEY, planId);

      const user = JSON.parse(
        window.localStorage.getItem(DEMO_USER_KEY) ??
          '{"email":"demo@pepeflix.com"}',
      );

      fetch("/api/demo-db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "subscription",
          email: user.email,
          planId,
        }),
      });
    }
  }, [checkout, planId]);

  return null;
}
