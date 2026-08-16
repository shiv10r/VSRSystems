import { BusinessOfferings } from "../components/home/BusinessOfferings"
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
} from "../components/home/HomeSecondary"
import { MilestonesStory } from "../components/home/MilestonesStory"
import { OperatingModel } from "../components/home/OperatingModel"
import { ProjectsFeed } from "../components/home/ProjectsFeed"
import { TechnologyLandscape } from "../components/home/TechnologyLandscape"
import { PageMeta } from "../components/shared/PageMeta"

export const HomePage = () => (
  <>
    <PageMeta
      title="Software, Cloud, Data & AI Engineering"
      description="VSR Systems helps businesses build modern software, cloud platforms, AI automation, data solutions and secure digital products."
    />
    <Hero />
    <Intro />
    <MilestonesStory />
    <ServicesGrid />
    <BusinessOfferings />
    <OperatingModel />
    <StoryPanel />
    <CapabilityCards />
    <Advantage />
    <Differentiators />
    <TechnologyLandscape />
    <IndustriesGrid />
    <DeliveryProcess />
    <ProjectsFeed />
    <InsightsPreview />
    <FinalCta />
  </>
)
