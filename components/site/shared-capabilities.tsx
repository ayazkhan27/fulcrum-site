import { Plus } from "lucide-react"
import { sharedCapabilities } from "@/lib/shared-capabilities"
export function SharedCapabilities() {
  return (
    <div className="shared-accordion">
      {sharedCapabilities.map((item, index) => (
        <details name="shared-capability" key={item.title} open={index === 0}>
          <summary>
            <span className="capability-number">0{index + 1}</span>
            <h3>{item.title}</h3>
            <Plus size={20} aria-hidden="true" />
          </summary>
          <div className="shared-answer">
            <p>{item.body}</p>
            <p className="capability-output">
              <span>Potential deliverable</span>
              {item.output}
            </p>
          </div>
        </details>
      ))}
    </div>
  )
}
