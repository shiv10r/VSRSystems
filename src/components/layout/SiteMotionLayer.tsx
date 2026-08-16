import { useReducedMotion } from "framer-motion"

const signalTracks = [
  { path: "M-80 180 C260 40 470 410 830 210 S1250 60 1520 250", duration: "8s", delay: "0s" },
  { path: "M-60 620 C300 430 560 820 920 570 S1260 430 1500 690", duration: "10s", delay: "-3s" },
  { path: "M180 -80 C360 210 690 80 860 390 S1120 760 1390 940", duration: "12s", delay: "-6s" },
] as const

export const SiteMotionLayer = () => {
  const reduceMotion = useReducedMotion()

  return (
    <div className="site-motion" aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <title>Decorative background signal network</title>
        {signalTracks.map((track) => (
          <g key={track.path}>
            <path className="site-motion__track" d={track.path} />
            {reduceMotion ? null : (
              <circle className="site-motion__packet" r="4">
                <animateMotion
                  path={track.path}
                  dur={track.duration}
                  begin={track.delay}
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}
