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
    detail: "Scoop 25g of TrueFuel Carb Mix into your flask. That's roughly 2 level tablespoons. This gives you 25g of carbohydrates — about 14g maltodextrin and 11g fructose at the 1:0.8 ratio.",
  },
  {
    step: 2,
    title: "Add water",
    icon: Droplets,
    detail: "Add 30–40ml of warm water (not boiling). Warm water dissolves the powder faster and creates a smoother, thicker gel consistency. Less water = thicker gel. More water = thinner, more drinkable.",
  },
  {
    step: 3,
    title: "Shake and seal",
    icon: FlaskConical,
    detail: "Lock the bite valve closed, then shake the flask firmly for 15–20 seconds until fully dissolved. No lumps. The gel should be a smooth, slightly viscous liquid. Seal the valve and you're race-ready.",
  },
  {
    step: 4,
    title: "Fuel on the move",
    icon: Timer,
    detail: "During your run, aim for 1 serving (25g carbs) every 20–30 minutes. For maximum absorption of 90g/hr, take a serving every 15–17 minutes. Chase each serving with a sip of water for best results.",
  },
];

const TIPS = [
  { title: "Batch prep the night before", text: "Mix your gels the evening before a long run. Store filled flasks in the fridge overnight — they'll be ready to grab and go." },
  { title: "Adjust thickness to preference", text: "Use 25ml water for a thick, peanut-butter-like gel. Use 50ml for a thin, easy-to-swallow consistency. Experiment in training, not on race day." },
  { title: "Add flavoring (optional)", text: "A pinch of salt (1/8 tsp) aids electrolyte balance. A few drops of lemon juice or Mio-style flavoring makes it tastier. Keep it simple." },
  { title: "Clean your flasks after every use", text: "Rinse with warm soapy water immediately after your run. Flasks are dishwasher safe — top rack. Don't let gel dry inside." },
];

const FUELING_TABLE = [
  { duration: "60–90 min", carbs: "30–60g/hr", servings: "1–2 per hour", note: "Moderate effort, shorter races" },
  { duration: "90 min – 3 hr", carbs: "60–80g/hr", servings: "2–3 per hour", note: "Marathon, half-marathon" },
  { duration: "3+ hours", carbs: "80–90g/hr", servings: "3–4 per hour", note: "Ultra distance, gut-trained athletes" },
];

export default function HowTo() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-display text-xl font-bold mb-2" data-testid="text-howto-title">How to make your gel</h1>
      <p className="text-sm text-muted-foreground mb-10 max-w-lg">
        Four steps from powder to race-ready fuel. No blender needed — just a flask, a scoop, and water.
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
        <h2 className="font-semibold text-base mb-1">The science: why 1:0.8</h2>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl leading-relaxed">
          Your gut absorbs glucose (from maltodextrin) and fructose through separate transporters — SGLT1 and GLUT5 respectively. 
          Using both pathways simultaneously lets your body absorb up to 90g of carbohydrate per hour, 
          compared to ~60g/hr from glucose alone.
        </p>
        <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
          The 1:0.8 maltodextrin-to-fructose ratio maximizes this dual-transporter absorption. 
          It's the same ratio used by Maurten, SiS Beta Fuel, and other premium gel brands — 
          we just sell you the raw ingredients without the $3–$5 per packet markup.
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
