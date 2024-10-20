import React from 'react'

export function Breadcrumbs({
  breads = []
}) {
  return breads.length ? (
    <div className="container mx-8">
      <nav className="breadcrumbs">
        <ol>
          {
            breads.map((bread, index) => (
              <li key={index}>
                <a href={bread.href}>{bread.label}</a>
              </li>
            ))
          }
        </ol>
      </nav>
    </div>

  ) : <></>
}
