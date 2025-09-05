import { formatDate } from "@/utils/date";
import { describe, expect, it } from "vitest";

describe("date utils", () => {
  describe("formatDate", () => {
    it("should format date string correctly", () => {
      const date = "2023-12-25T10:30:00Z";
      const formatted = formatDate(date);

      // Verifica se retorna uma string no formato esperado
      expect(typeof formatted).toBe("string");
      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it("should format Date object correctly", () => {
      const date = new Date("2023-12-25T10:30:00Z").toString();
      const formatted = formatDate(date);

      expect(typeof formatted).toBe("string");
      expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it("should handle invalid date gracefully", () => {
      const result = formatDate("invalid-date");

      // Dependendo da implementação, pode retornar uma string de erro ou data inválida
      expect(typeof result).toBe("string");
    });

    it("should handle null/undefined gracefully", () => {
      // @ts-ignore - testando comportamento com input inválido
      const resultNull = formatDate(null);
      // @ts-ignore - testando comportamento com input inválido
      const resultUndefined = formatDate(undefined);

      expect(typeof resultNull).toBe("string");
      expect(typeof resultUndefined).toBe("string");
    });
  });
});
