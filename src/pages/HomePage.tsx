import { Hero } from "../components/home/Hero"
import {
  Advantage,
  CapabilityCards,
  Intro,
  ServicesGrid,
  StoryPanel,
} from "../components/home/HomePrimary"
import {
  DeliveryProcess,
  Differentiators,
  FinalCta,
  IndustriesGrid,
  InsightsPreview,
  TechnologyMarquee,
} from "../components/home/HomeSecondary"
import { PageMeta } from "../components/shared/PageMeta"

export const HomePage = () => (
  <>
    <PageMeta
      title="Software, Cloud, Data & AI Engineering"
      description="VSR Systems helps businesses build modern software, cloud platforms, AI automation, data solutions and secure digital products."
    />
    <Hero />
    <Intro />
    <ServicesGrid />
    <StoryPanel />
    <CapabilityCards />
    <Advantage />
    <Differentiators />
    <TechnologyMarquee />
    <IndustriesGrid />
    <DeliveryProcess />
    <InsightsPreview />
    <FinalCta />
  </>
)
