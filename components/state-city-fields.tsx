"use client";

import { useMemo, useState } from "react";
import { FormField, selectClassName } from "@/components/form-field";
import { getCitiesForState, INDIAN_STATES } from "@/lib/form-options";

export function StateCityFields() {
  const [state, setState] = useState("");

  const cities = useMemo(() => getCitiesForState(state), [state]);

  return (
    <>
      <FormField label="State" htmlFor="state">
        <select
          id="state"
          name="state"
          required
          className={selectClassName}
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">Select state</option>
          {INDIAN_STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="City" htmlFor="city">
        <select
          id="city"
          name="city"
          required
          className={selectClassName}
          disabled={!state}
          key={state || "no-state"}
        >
          <option value="">{state ? "Select city" : "Select state first"}</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </FormField>
    </>
  );
}
