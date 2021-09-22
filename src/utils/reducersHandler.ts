export const updateObjectWithNewProps = (items: any, itemID: any, propName: any, newProp: any) => {
  return items.map((u: any) => {
    if (u[propName] === itemID) {
      return {...u, ...newProp}
    }
    return u;
  })
}

