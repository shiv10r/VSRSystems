import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { SiteLayout } from "../components/layout/SiteLayout"

const HomePage = lazy(async () => {
  const page = await import("../pages/HomePage")
  return { default: page.HomePage }
})

const ContactPage = lazy(async () => {
  const page = await import("../pages/ContactPage")
  return { default: page.ContactPage }
})

const ServicesPage = lazy(async () => {
  const page = await import("../pages/ServicePages")
  return { default: page.ServicesPage }
})

const ServiceDetailPage = lazy(async () => {
  const page = await import("../pages/ServicePages")
  return { default: page.ServiceDetailPage }
})

const CompanyPage = lazy(async () => {
  const page = await import("../pages/InfoPages")
  return { default: page.CompanyPage }
})

const IndustriesPage = lazy(async () => {
  const page = await import("../pages/InfoPages")
  return { default: page.IndustriesPage }
})

const InsightsPage = lazy(async () => {
  const page = await import("../pages/InfoPages")
  return { default: page.InsightsPage }
})

const CareersPage = lazy(async () => {
  const page = await import("../pages/InfoPages")
  return { default: page.CareersPage }
})

const PrivacyPage = lazy(async () => {
  const page = await import("../pages/InfoPages")
  return { default: page.PrivacyPage }
})

const NotFoundPage = lazy(async () => {
  const page = await import("../pages/InfoPages")
  return { default: page.NotFoundPage }
})

const loadingFallback = (
  <div className="route-loading" role="status">
    Loading VSR Systems...
  </div>
)

export const App = () => (
  <Suspense fallback={loadingFallback}>
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="company" element={<CompanyPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServiceDetailPage />} />
        <Route path="industries" element={<IndustriesPage />} />
        <Route path="insights" element={<InsightsPage />} />
        <Route path="careers" element={<CareersPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Suspense>
)
