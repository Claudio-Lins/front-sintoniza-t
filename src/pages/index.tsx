import axios from 'axios'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Section } from '../components/assets/Section'
import { Title } from '../components/assets/Titles'
import { Destaque } from '../components/Destaque'

interface HomeProps {
  destaque: any
  team: {
    name: string
    email: string
    cargo: string
    nationality: string
    telemovel: string
    fileUrl: string
  }
}

const Home = ({ destaque, team }: HomeProps) => {
  return (
    <>
      <Head>
        <title>Sintoniza-t</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Section id="destaque" sectioColor={true}>
          <Title title="Destaque" delay={0.5} />
          <Destaque destaque={destaque} />
        </Section>
        <Section id="equipa" sectioColor={false}>
          <Title title="Equipa" delay={1} />
          
        </Section>
      </main>
    </>
  )
}

export default Home

// use axios.all to get all the data at once
export const getStaticProps: GetStaticProps = async () => {
  const [destaque, team] = await Promise.all([
    axios.get(`${process.env.API_URL_STRAPI}/articles?_sort=id:desc`),
    axios.get(`${process.env.API_URL_SINTONIZA_T}/team`),
  ])
  
  return {
    props: {
      destaque: destaque.data,
      team: team.data,
    },
  }
}


// export const getStaticProps: GetStaticProps = async () => {
//   const res = await axios.get(
//     `${process.env.API_URL_STRAPI}/articles?_sort=id:desc`
//   )
//   return {
//     props: {
//       destaque: res.data,
//     },
//     revalidate: 1,
//   }
// }
