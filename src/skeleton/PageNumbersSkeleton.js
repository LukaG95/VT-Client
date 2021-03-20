import React from 'react'

export default function PageNumbersSkeleton() {

  const pageButtons = Array(12).fill(<button className="pageButton skeleton"></button>)

  return (
    <section className="page-numbers-field">
      <div className="page-left noUserInteraction"></div>
        {pageButtons}
      <div className="page-right noUserInteraction"></div>
  </section>
  )
}
