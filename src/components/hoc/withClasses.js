import React from 'react'

const WithClasses = (Component, className) => props => (
  <div className={className}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...props} />
  </div>
)

export default WithClasses
