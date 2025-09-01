import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';

/**
 * Sanitiza strings removendo caracteres perigosos e normalizando
 */
export function SanitizeString() {
  return Transform(({ value }) => {
    if (typeof value !== 'string') return value;

    return value
      .trim() // Remove espaços nas bordas
      .replace(/\s+/g, ' ') // Substitui múltiplos espaços por um
      .replace(/[<>]/g, '') // Remove < e >
      .replace(/['"]/g, '') // Remove aspas perigosas
      .substring(0, 255); // Limita tamanho
  });
}

/**
 * Normaliza gênero para lowercase
 */
export function NormalizeGenre() {
  return Transform(({ value }) => {
    if (typeof value !== 'string') return value;

    return value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, ' '); // Normaliza espaços
  });
}

/**
 * Converte e valida ano
 */
export function ValidateYear() {
  return Transform(({ value }) => {
    if (!value) return value;

    const year = value.toString().trim();
    const yearNum = parseInt(year);
    const currentYear = new Date().getFullYear();

    if (isNaN(yearNum) || yearNum < 1800 || yearNum > currentYear + 10) {
      throw new BadRequestException(
        `Invalid year: ${year}. Must be between 1800 and ${currentYear + 10}`,
      );
    }

    return year;
  });
}

/**
 * Converte rating para número com 1 casa decimal
 */
export function NormalizeRating() {
  return Transform(({ value }) => {
    if (value === undefined || value === null) return value;

    const num = parseFloat(value);
    if (isNaN(num)) return 0;

    // Arredonda para 1 casa decimal
    return Math.round(Math.max(0, Math.min(10, num)) * 10) / 10;
  });
}

/**
 * Sanitiza texto de busca
 */
export function SanitizeSearch() {
  return Transform(({ value }) => {
    if (!value || typeof value !== 'string') return undefined;

    return (
      value
        .trim()
        .replace(/[<>'"]/g, '') // Remove caracteres perigosos
        .replace(/[^\w\s-]/g, '') // Permite apenas letras, números, espaços e hífens
        .replace(/\s+/g, ' ') // Normaliza espaços
        .substring(0, 100) || // Limita tamanho
      undefined
    ); // Retorna undefined se vazio
  });
}
