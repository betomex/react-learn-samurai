export const updateObjectWithNewProps = (items, itemID, propName, newProp) => {
  return items.map(u => {
    if (u[propName] === itemID) {
      return {...u, ...newProp}
    }
    return u;
  })
}

