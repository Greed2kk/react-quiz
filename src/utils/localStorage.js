export function addToLS(properties) {
  Object.keys(properties).forEach(prop => {
    localStorage.setItem(prop, properties[prop])
  })
}

export function actionToLS(properties, action) {
  return properties.forEach(prop =>
    localStorage[action](prop)
  )
}

export function expirationDate(expiresIn) {
  return new Date(new Date().getTime() + expiresIn * 1000)
}
