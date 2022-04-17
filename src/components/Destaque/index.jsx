import React from 'react'
import ArticleCard from './ArticleCard'
import { useWindowSize } from '../../../hooks/useWindowSize'
import Link from 'next/link'


export function Destaque({destaque}) {
  const { windowWidth } = useWindowSize()
  return (
    <div>
      <div className='flex items-center justify-between gap-6 mt-10'>
          {destaque
            .slice(0, windowWidth < 768 ? 1 : windowWidth < 1280 ? 2 : 3)
            // .sort((a, b) => a.ordem - b.ordem)
            .map((destaque) => (
              <div key={destaque.id} className=''>
                <Link href={`/articles/${destaque.slug}`}>
                  <a className=''>
                    <ArticleCard destaque={destaque} />
                  </a>
                </Link>
              </div>
            ))}
        </div>
    </div>
  )
}
