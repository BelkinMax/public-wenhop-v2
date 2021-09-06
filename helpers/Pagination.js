export const pagination = params => {
  const { currentOffset, totalItems, limit } = params;
  let nextOffset, previousOffset, currentPage, totalPages;

  totalPages = Math.ceil(totalItems / limit);

  nextOffset = currentOffset + limit;
  if (nextOffset > totalItems - 1) nextOffset = totalItems - 1;

  previousOffset = currentOffset - limit;
  if (previousOffset < 0) previousOffset = 0;

  currentPage = Math.ceil((currentOffset + 1) / limit);

  return {
    nextOffset,
    previousOffset,
    currentPage,
    totalPages
  };
};
