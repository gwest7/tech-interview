const ITEMS = [
  'apple', 'apricot', 'avocado', 'banana', 'blackberry', 'blueberry', 'cherry', 'coconut',
  'cranberry', 'date', 'fig', 'grape', 'grapefruit', 'guava', 'kiwi', 'lemon', 'lime',
  'lychee', 'mango', 'melon', 'nectarine', 'orange', 'papaya', 'peach', 'pear', 'pineapple',
  'plum', 'pomegranate', 'raspberry', 'strawberry', 'tangerine', 'watermelon',
];

export function search(q) {
  const needle = q.trim().toLowerCase();
  return needle ? ITEMS.filter((item) => item.includes(needle)) : [];
}
