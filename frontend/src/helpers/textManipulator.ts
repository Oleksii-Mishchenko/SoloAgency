const textManipulator = {
  capFirst: (string: string): string =>
    string.charAt(0).toUpperCase() + string.slice(1).toLowerCase(),

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
  handleProperBlur: (string: string): string => {
    const trimmedValue = trimString(string);
    const noDoubleSpaces = removeDoubleSpaces(trimmedValue);
    const capEveryValue = capEvery(noDoubleSpaces);

    return capEveryValue;
  },

  handleCommonBlur: (string: string): string => {
    const trimmedValue = trimString(string);
    const noDoubleSpaces = removeDoubleSpaces(trimmedValue);
    const capFirstValue = capFirst(noDoubleSpaces);

    return capFirstValue;
  },
};

export const { handleProperBlur, handleCommonBlur } = inputHandlers;
