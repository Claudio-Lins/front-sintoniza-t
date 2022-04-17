import React from 'react'
import ArticleCard from './ArticleCard'
import { useWindowSize } from '../../../hooks/useWindowSize'
import Link from 'next/link'

interface DestqueProps {
  destaque: {
    id: number
    slug: string
    title: string
    content: string
  }
  windowWidth: number
}

export function Destaque({destaque}:DestqueProps) {
  const { windowWidth } = useWindowSize()
  return (
    <div>
      <div className='flex items-center justify-between gap-6 mt-10'>
          {destaque
            .slice(0, windowWidth < 768 ? 1 : windowWidth < 1280 ? 2 : 3)
            .map((destaque: { id: React.Key | null | undefined; slug: any }) => (
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
