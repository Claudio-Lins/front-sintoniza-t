import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Section } from '../components/assets/Section'
import { Title } from '../components/assets/Titles'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Sintoniza-t</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Section id='destaque' sectioColor={true}>
          <Title title='Destaque' delay={0.5} />
          <div className='flex flex-col items-center justify-center'>
            <div className="w-full h-56 bg-pink-700"></div>
            </div>
        </Section>
        <Section id='equipa' sectioColor={false}>
          <Title title='Equipa' delay={1} />
          <div className='flex flex-col items-center justify-center'>
            <div className="w-full h-56"></div>
            </div>
        </Section>
      </main>

    </div>
  )
}

export default Home
