import Link from 'next/link'
import React from 'react'
import { useWindowSize } from '../../../hooks/useWindowSize'
import ArticleCard from './ArticleCard'



interface DestaqueProps {
  destaque: any
  
}

export function Destaque({ destaque }: DestaqueProps) {
  const { windowWidth } = useWindowSize()

  const windowSize = useWindowSize()
  console.log(windowSize)
  return (
    <div>
      <div className="mt-10 flex items-center justify-between gap-6">
        {destaque
          .slice(0, windowWidth < 768 ? 1 : windowWidth < 1280 ? 2 : 3)
          .map((destaque: { id: React.Key | null | undefined; slug: any }) => (
            <div key={destaque.id} className="">
              {/* <Link href={`/articles/${destaque.slug}`}> */}
                <a className="">
                  <ArticleCard destaque={destaque} />
                </a>
              {/* </Link> */}
            </div>
          ))}
      </div>
    </div>
  )
}
