import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Beaker, Droplets, FlaskConical, Timer, AlertTriangle } from "lucide-react";

const STEPS = [
  {
    step: 1,
    title: "Measure the powder",
    icon: Beaker,
    detail: "Scoop 100g of TrueFuel Carb Mix into a mixing container. That's 100g of carbohydrates from our proprietary blend. One full flask gives you 4 gel servings worth of fuel.",
  },
  {
    step: 2,
    title: "Add water",
    icon: Droplets,
    detail: "Add 67ml of warm water (not boiling). Warm water dissolves the powder faster and creates a smoother gel consistency.",
  },
  {
    step: 3,
    title: "Blend and fill",
    icon: FlaskConical,
    detail: "Mix with a blender, hand mixer, or vigorously by hand until fully dissolved — no lumps. Pour the gel into your 150ml flask, seal the bite valve, and you're race-ready.",
  },
  {
    step: 4,
    title: "Fuel on the move",
    icon: Timer,
    detail: "Each flask holds ~100g of carbs (4 servings). Sip roughly a quarter of the flask every 20–30 minutes. For maximum absorption of 90g/hr, take smaller, more frequent sips. Chase each sip with water for best results.",
  },
];

const TIPS = [
  { title: "Batch prep the night before", text: "Mix your gel the evening before a long run. Store the filled flask in the fridge overnight — it'll be ready to grab and go." },
  { title: "Adjust thickness to preference", text: "Use less water (50ml) for a thicker gel, or more (80ml) for a thinner, easier-to-swallow consistency. Experiment in training, not on race day." },
  { title: "Add flavoring (optional)", text: "A pinch of salt (1/8 tsp) aids electrolyte balance. A few drops of lemon juice or Mio-style flavoring makes it tastier. Keep it simple." },
  { title: "Clean your flask after every use", text: "Rinse with warm soapy water immediately after your run. Flasks are dishwasher safe — top rack. Don't let gel dry inside." },
];

const FUELING_TABLE = [
  { duration: "60–90 min", carbs: "30–60g/hr", servings: "¼–½ flask/hr", note: "Moderate effort, shorter races" },
  { duration: "90 min – 3 hr", carbs: "60–80g/hr", servings: "½–¾ flask/hr", note: "Marathon, half-marathon" },
  { duration: "3+ hours", carbs: "80–100g/hr", servings: "¾–1 flask/hr", note: "Ultra distance, gut-trained athletes" },
];

export default function HowTo() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-display text-xl font-bold mb-2" data-testid="text-howto-title">How to make your gel</h1>
      <p className="text-sm text-muted-foreground mb-10 max-w-lg">
        Four steps from powder to race-ready fuel. A flask, a scoop, water, and a blender or some elbow grease.
      </p>

      {/* Steps */}
      <div className="space-y-6 mb-16">
        {STEPS.map((s) => (
          <div key={s.step} className="flex gap-4" data-testid={`step-${s.step}`}>
            <div className="shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
              <s.icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">
                <span className="text-muted-foreground mr-1.5">{s.step}.</span>
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fueling guide */}
      <section className="mb-16">
        <h2 className="font-semibold text-base mb-1">Fueling guide by duration</h2>
        <p className="text-sm text-muted-foreground mb-5">
          How many servings you need depends on effort duration and your gut tolerance. Train your gut in training before race day.
        </p>
        <div className="border border-border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-medium text-xs text-muted-foreground">Duration</th>
                <th className="text-left p-3 font-medium text-xs text-muted-foreground">Target carbs</th>
                <th className="text-left p-3 font-medium text-xs text-muted-foreground">TrueFuel servings</th>
                <th className="text-left p-3 font-medium text-xs text-muted-foreground hidden sm:table-cell">Notes</th>
              </tr>
            </thead>
            <tbody>
              {FUELING_TABLE.map((row, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-3 font-medium">{row.duration}</td>
                  <td className="p-3">{row.carbs}</td>
                  <td className="p-3">{row.servings}</td>
                  <td className="p-3 text-muted-foreground hidden sm:table-cell">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* The science */}
      <section className="mb-16">
        <h2 className="font-semibold text-base mb-1">The science behind the blend</h2>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl leading-relaxed">
          Your gut uses multiple carbohydrate transporters simultaneously. Our proprietary blend is 
          engineered to leverage these pathways, letting your body absorb up to 90g of carbohydrate per hour — 
          compared to ~60g/hr from single-source carbs alone.
        </p>
        <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
          TrueFuel's formula is optimized for maximum dual-transporter absorption — 
          the same science used by premium gel brands, 
          without the $3–$5 per packet markup.
        </p>
      </section>

      {/* Tips */}
      <section className="mb-16">
        <h2 className="font-semibold text-base mb-5">Tips for best results</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {TIPS.map((tip, i) => (
            <Card key={i} className="p-4" data-testid={`card-tip-${i}`}>
              <h3 className="font-semibold text-sm mb-1">{tip.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tip.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Warning */}
      <section className="p-4 rounded-md bg-[hsl(40,60%,95%)] dark:bg-[hsl(40,20%,14%)] border border-[hsl(40,40%,80%)] dark:border-[hsl(40,15%,24%)] mb-16">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-[hsl(40,70%,40%)] dark:text-[hsl(40,50%,55%)] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-sm mb-1">Important</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Always test your fueling strategy in training before race day. Start with lower carb intake 
              (30–40g/hr) and gradually increase over weeks to train your gut. If you experience GI distress, 
              reduce the concentration or take smaller, more frequent sips.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-8 border-t border-border">
        <h2 className="font-semibold text-base mb-2">Ready to fuel smarter?</h2>
        <p className="text-sm text-muted-foreground mb-5">Grab a flask and a bag of carb mix to get started.</p>
        <Link href="/shop">
          <Button data-testid="button-shop-cta">
            Shop now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
