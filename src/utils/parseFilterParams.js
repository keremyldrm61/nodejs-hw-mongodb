const parseContactType = (type) => {
  const contactType = (type) => ['work', 'home', 'personal'].includes(type);
  if (contactType(type)) return type;
};

const parseIsFavourite = (favourite) => {
  if (favourite === 'true') return true;
  if (favourite === 'false') return false;

  return undefined;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedIsFavourite,
  };
};
