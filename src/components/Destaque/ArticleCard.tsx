import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { motion } from 'framer-motion'
import { scaleUp } from '../../../utils/Motion/variants'
// import { useScroll } from '../assets/useScroll'
export type ArticleCardProps = {
  destaque: any
}

export default function ArticleCard({ destaque }: ArticleCardProps) {
  // const [element, controls] = useScroll()
  const dataPost = Intl.DateTimeFormat('pt-PT').format(
    new Date(destaque.data ? destaque.data : destaque.published_at)
  )

  return (
    <>
      <motion.div
        variants={scaleUp('up', 1)}
        initial="initial"
        animate="animate"
        className="overflow-hidden rounded-2xl border bg-white shadow-md"
      >
        <div className="mx-auto h-[550px] max-w-md ">
          <div className="relative h-64 w-full bg-white">
            <Image
              src={destaque.image.url}
              alt="images"
              layout="fill"
              objectFit="fill"
            />
          </div>
          <div className="flex flex-col items-center justify-center p-6">
            <time className="mb-2 rounded-lg bg-green-800 p-1 text-center text-sm font-semibold tracking-wide text-gray-50 shadow-lg sm:w-1/4">
              {dataPost}
            </time>
            <div>
              <h2 className="text-center text-lg font-bold leading-tight text-green-900 2xl:text-2xl">
                {destaque.title.length > 55
                  ? `${destaque.title.slice(0, 55)}...`
                  : destaque.title
                }
              </h2>
              <p className="mt-2 text-center text-sm font-semibold text-green-900">
                {destaque.subtitle && destaque.subtitle.slice(0, 60)}
              </p>
            </div>
            <div className="bg-gradient-to-b from-black to-white bg-clip-text text-justify text-sm font-light text-transparent antialiased md:leading-5 ">
              <ReactMarkdown>
                {destaque.content.length > 285
                  ? destaque.content.slice(0, 285) + '...'
                  : destaque.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </motion.div>
      {/* <pre>{JSON.stringify(articles, null, 2)}</pre> */}
    </>
  )
}
