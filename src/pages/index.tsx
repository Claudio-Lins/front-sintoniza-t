import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Section } from '../components/assets/Section'
import { Title } from '../components/assets/Titles'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sintoniza-t</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=''>
        <Section id="destaque" sectioColor={true}>
          <Title title="Destaque" delay={0.5} />
        </Section>
        <Section id="equipa" sectioColor={false}>
          <Title title="Equipa" delay={1} />
        </Section>
      </main>
    </>
  )
}

export default Home
