const search = (user, searchQuery) => {
  const foundName = user.name.toLowerCase().includes(searchQuery);
  const foundEmail = user.email.toLowerCase().includes(searchQuery);
  const foundRole = user.role.toLowerCase().includes(searchQuery);

  if (foundName || foundEmail || foundRole) {
    return true;
  }
  return false;
};

export default search;
