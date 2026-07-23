"use client";

import { FormField, selectClassName } from "@/components/form-field";
import { BOARDS_12TH } from "@/lib/form-options";

export function BoardSelectField() {
  return (
    <FormField label="12th board" htmlFor="board">
      <select id="board" name="board" required className={selectClassName}>
        <option value="">Select board</option>
        {BOARDS_12TH.map((board) => (
          <option key={board} value={board}>
            {board}
          </option>
        ))}
      </select>
    </FormField>
  );
}
