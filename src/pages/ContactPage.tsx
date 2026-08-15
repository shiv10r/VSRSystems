import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import type { ReactNode } from "react"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import { z } from "zod"
import { PageMeta } from "../components/shared/PageMeta"
import { RouteHero } from "../components/shared/RouteHero"
import { services } from "../data/services"
import { siteConfig } from "../data/site"

const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid work email"),
  company: z.string().trim(),
  phone: z.string().trim(),
  service: z.string().min(1, "Select a service"),
  budget: z.string(),
  message: z.string().trim().min(20, "Tell us a little more about the challenge"),
  consent: z.literal(true, { error: "Confirm that we may respond to your inquiry" }),
})

type ContactFields = z.infer<typeof contactSchema>

export const ContactPage = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [searchParams] = useSearchParams()
  const submitted = searchParams.get("submitted") === "true"
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFields>({ resolver: zodResolver(contactSchema) })
  const submitValidatedForm = () => formRef.current?.submit()

  return (
    <>
      <PageMeta
        title="Contact"
        description="Start a software, cloud, data, AI or security project with VSR Systems."
      />
      <RouteHero
        eyebrow="Contact"
        title="Let's build what's next"
        description="Tell us about the product, platform, automation, cloud, data or engineering challenge you are working on."
      />
      <section className="section contact-section">
        <div className="container contact-grid">
          <aside>
            <p className="eyebrow">Direct contact</p>
            <h2>A clear conversation starts here.</h2>
            <p>
              Share the context, desired outcome and the constraints you already know. We will
              respond through the email you provide.
            </p>
            <a className="contact-email" href={`mailto:${siteConfig.email}`}>
              <Mail aria-hidden="true" />
              {siteConfig.email}
            </a>
          </aside>
          <div className="contact-form-wrap surface">
            {submitted ? (
              <div className="form-success" role="status">
                <h2>Message received.</h2>
                <p>
                  Thank you for contacting VSR Systems. Keep the direct email above if you need to
                  add context.
                </p>
              </div>
            ) : null}
            <form
              ref={formRef}
              className="contact-form"
              name="contact"
              method="POST"
              action="/contact?submitted=true"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit(submitValidatedForm)}
              noValidate
            >
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden-field">
                <label>
                  Do not fill this out: <input name="bot-field" />
                </label>
              </p>
              <Field id="fullName" label="Full name" error={errors.fullName?.message}>
                <input id="fullName" {...register("fullName")} type="text" autoComplete="name" />
              </Field>
              <Field id="email" label="Work email" error={errors.email?.message}>
                <input id="email" {...register("email")} type="email" autoComplete="email" />
              </Field>
              <div className="form-row">
                <Field id="company" label="Company" error={errors.company?.message}>
                  <input
                    id="company"
                    {...register("company")}
                    type="text"
                    autoComplete="organization"
                  />
                </Field>
                <Field id="phone" label="Phone (optional)" error={errors.phone?.message}>
                  <input id="phone" {...register("phone")} type="tel" autoComplete="tel" />
                </Field>
              </div>
              <div className="form-row">
                <Field id="service" label="Service interested in" error={errors.service?.message}>
                  <select id="service" {...register("service")} defaultValue="">
                    <option value="" disabled>
                      Select a service
                    </option>
                    {services.map((service) => (
                      <option key={service.slug} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </Field>
                <Field id="budget" label="Project budget (optional)" error={errors.budget?.message}>
                  <select id="budget" {...register("budget")} defaultValue="">
                    <option value="">Prefer not to say</option>
                    <option value="Discovery">Discovery engagement</option>
                    <option value="Defined project">Defined project</option>
                    <option value="Ongoing program">Ongoing program</option>
                  </select>
                </Field>
              </div>
              <Field id="message" label="Message" error={errors.message?.message}>
                <textarea id="message" {...register("message")} rows={6} />
              </Field>
              <label className="consent">
                <input {...register("consent")} type="checkbox" />
                <span>
                  I agree that VSR Systems may use this information to respond to my inquiry.
                </span>
              </label>
              {errors.consent?.message === undefined ? null : (
                <p className="field-error">{errors.consent.message}</p>
              )}
              <button className="button button--primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Preparing message..." : "Send inquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

type FieldProps = {
  readonly id: string
  readonly label: string
  readonly error: string | undefined
  readonly children: ReactNode
}
const Field = ({ id, label, error, children }: FieldProps) => (
  <div className="form-field">
    <label htmlFor={id}>{label}</label>
    {children}
    {error === undefined ? null : <small className="field-error">{error}</small>}
  </div>
)
