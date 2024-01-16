const textManipulator = {
  capFirst: (string: string): string =>
    string.charAt(0).toUpperCase() + string.slice(1),

  capEvery: (string: string): string =>
    string
      .split(' ')
      .map(word => capFirst(word))
      .join(' '),

  removeLeadingSpace: (string: string): string => string.trimStart(),

  removeDoubleSpaces: (string: string): string =>
    string.replace(/\s{2,}/g, ' '),

  trimString: (string: string): string => string.trim(),
};

export const {
  capEvery,
  capFirst,
  removeLeadingSpace,
  removeDoubleSpaces,
  trimString,
} = textManipulator;

const inputHandlers = {
  handleNameChange: (string: string): string => {
    const trimmedValue = removeLeadingSpace(string);
    const noDoubleSpaces = removeDoubleSpaces(trimmedValue);
    const capEveryValue = capEvery(noDoubleSpaces);

    return capEveryValue;
  },

  handleCityChange: (string: string): string => {
    const trimmedValue = removeLeadingSpace(string);
    const noDoubleSpaces = removeDoubleSpaces(trimmedValue);
    const capFirstValue = capFirst(noDoubleSpaces);

    return capFirstValue;
  },
};

export const { handleNameChange, handleCityChange } = inputHandlers;
