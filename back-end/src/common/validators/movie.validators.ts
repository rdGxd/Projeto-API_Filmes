import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// Validator para ano válido
@ValidatorConstraint({ name: 'isValidYear', async: false })
export class IsValidYearConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    if (typeof value !== 'string') return false;

    const year = parseInt(value);
    const currentYear = new Date().getFullYear();

    return !isNaN(year) && year >= 1800 && year <= currentYear + 10;
  }

  defaultMessage(args: ValidationArguments): string {
    const currentYear = new Date().getFullYear();
    return `Year must be between 1800 and ${currentYear + 10}`;
  }
}

export function IsValidYear(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidYear',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidYearConstraint,
    });
  };
}

// Validator para gênero válido
@ValidatorConstraint({ name: 'isValidGenre', async: false })
export class IsValidGenreConstraint implements ValidatorConstraintInterface {
  private readonly validGenres = [
    'action',
    'adventure',
    'comedy',
    'drama',
    'fantasy',
    'horror',
    'mystery',
    'romance',
    'thriller',
    'sci-fi',
    'documentary',
    'animation',
    'crime',
    'family',
    'music',
  ];

  validate(value: any): boolean {
    if (typeof value !== 'string') return false;

    const normalizedGenre = value.toLowerCase().trim();
    return this.validGenres.includes(normalizedGenre);
  }

  defaultMessage(): string {
    return `Genre must be one of: ${this.validGenres.join(', ')}`;
  }
}

export function IsValidGenre(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidGenre',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidGenreConstraint,
    });
  };
}

// Validator para rating específico
@ValidatorConstraint({ name: 'isValidRating', async: false })
export class IsValidRatingConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    const num = parseFloat(value);
    return !isNaN(num) && num >= 0 && num <= 10 && Number.isFinite(num);
  }

  defaultMessage(): string {
    return 'Rating must be a number between 0 and 10';
  }
}

export function IsValidRating(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isValidRating',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidRatingConstraint,
    });
  };
}
