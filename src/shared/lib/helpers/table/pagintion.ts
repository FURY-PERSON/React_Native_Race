export function getPaginationLabel(
  page: number,
  limit: number,
  totalItems: number,
) {
  return `${page * limit + 1}-${
    totalItems < (page + 1) * limit ? totalItems : (page + 1) * limit
  } of ${totalItems}`;
}
