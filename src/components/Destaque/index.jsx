import React from 'react'
import { useWindowSize } from '../../../hooks/useWindowSize'
import ArticleCard from './ArticleCard'


export function Destaque({ destaque }) {
  const { windowWidth } = useWindowSize()
  return (
    <div>
      <div className="mt-10 flex items-center justify-between gap-6">
        {destaque
          .slice(0, windowWidth < 768 ? 1 : windowWidth < 1280 ? 2 : 3)
          .map((destaque) => (
            <div key={destaque.id} className="">
              {/* <Link href={`/articles/${destaque.slug}`}> */}
                <a className="">
                  <ArticleCard destaque={destaque} delay={1} />
                </a>
              {/* </Link> */}
            </div>
          ))}
      </div>
    </div>
  )
}
