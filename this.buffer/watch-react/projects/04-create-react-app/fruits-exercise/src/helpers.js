export function choice(items) {
  return items[Math.floor(Math.random() * items.length)];
}

export function remove(items, item) {
  const removeIndex = items.indexOf(item);
  if (removeIndex >= 0) {
    return items.splice(removeIndex, 1);
  }
}
