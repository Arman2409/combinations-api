// Get all prefixes in alphabet
const prefixes = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i),
);

const prefixItems = (items: number[]): string[] => {
  const prefixedItems: string[] = [];

  items.forEach((type, index) => {
    const prefix = prefixes[index] || 'X'; // Default to 'X' if type exceeds predefined prefixes
    for (let i = 1; i <= type; i++) {
      prefixedItems.push(`${prefix}${i}`);
    }
  });

  return prefixedItems;
};

export default prefixItems;
