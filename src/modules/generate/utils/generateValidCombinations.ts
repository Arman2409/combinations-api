const generateValidCombinations = (
  items: string[],
  length: number,
): string[][] => {
  const results: string[][] = [];
  const combination = [];

  // Helper function to generate combinations recursively
  const backtrack = (start: number) => {
    if (combination.length === length) {
      results.push([...combination]);
      return;
    }

    for (let i = start; i < items.length; i++) {
      const prefix = items[i][0];
      if (combination.some((item) => item[0] === prefix)) {
        continue; // Skip if the combination already contains the same prefix
      }

      combination.push(items[i]);
      backtrack(i + 1);
      combination.pop();
    }
  };

  backtrack(0);
  return results;
};

export default generateValidCombinations;
