import axios from 'axios'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Section } from '../components/assets/Section'
import { Title } from '../components/assets/Titles'
import { Destaque } from '../components/Destaque'
import { Team } from '../components/Team'
import { Newsletter } from '../components/newsletter'
import prisma from '../../lib/prisma'

interface TeamsProps {
  id: number
  name: string
  email: string
  telemovel: string
  cargo: string
  nationality: string
  fileUrl: string
}

interface HomeProps {
  destaque: any
  team: TeamsProps
}

const Home = ({ destaque, team }: HomeProps) => {
  return (
    <>
      <Head>
        <title>Sintoniza-t</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Section id="destaque" sectionColor={true}>
          <Title title="Destaque" delay={0.5} />
          <Destaque destaque={destaque} />
        </Section>
        <Section id="quem-somos" sectionColor={false}>
          <Title title="Quem somos" delay={1} />
        </Section>
        <Newsletter />
        {/* <Section id="programas" sectionColor={true}>
          <Title title="Programas" delay={1} />
        </Section> */}
        {/* <Section id="horarios" sectionColor={false}>
          <Title title="Horários" delay={1} />
        </Section> */}
        <Section id="equipa" sectionColor={true}>
          <Title title="Equipa" delay={1} />
          <Team team={team} />
        </Section>
        {/* <Section id="imprensa" sectionColor={false}>
          <Title title="Imprensa" delay={1} />
        </Section> */}
        <Section id="colabore" sectionColor={true}>
          <Title title="Colabore connosco" delay={1} />
        </Section>
        <Section id="contacto" sectionColor={false}>
          <Title title="Contacto" delay={1} />
        </Section>
      </main>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get(
    `${process.env.API_URL_STRAPI}/articles?_sort=id:desc`
  )
  const team = await prisma.team.findMany()
  return {
    props: {
      destaque: res.data,
      team: JSON.parse(JSON.stringify(team)),
    },
    revalidate: 1,
  }
}
