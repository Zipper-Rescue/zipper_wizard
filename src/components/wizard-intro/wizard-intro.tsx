import { AsyncImage } from "../async-image";

export function WizardIntro() {
  return (
    <>
      <h1 className="text-4xl p-4 text-center" style={{ lineHeight: "1.5" }}>
        Welcome to the <strong className="text-nowrap">Zipper Wizard!</strong>
      </h1>
      <div className="flex flex-col md:flex-row gap-12 my-4 md:my-10">
        <AsyncImage
          src={() => import("./images/wizard.svg")}
          alt={"Wizard Intro"}
          className={"max-h-[240px] object-contain"}
        />

        <div className="flex flex-col gap-4">
          <div className="relative w-full">
            <AsyncImage
              src={() => import("./images/speech-bubble.svg")}
              alt={"Wizard Intro"}
              className={"min-w-72 max-w-72 object-contain hidden md:block"}
            />
            <div className="text-center w-full md:absolute md:top-10 md:left-4 md:text-left italic">
              Things you&apos;ll need for your quest
            </div>
          </div>

          <div className="flex gap-3">
            {...[
              {
                image: () => import("./images/zipper-icon.svg"),
                label: "Broken item",
              },
              {
                image: () => import("./images/ruler-icon.svg"),
                label: "Standard ruler",
              },
              {
                image: () => import("./images/timer-icon.svg"),
                label: "5 Minutes",
              },
            ].map((it) => (
              <div className="flex flex-col items-center gap-1" key={it.label}>
                <AsyncImage src={it.image} alt={it.label} className="h-24" />
                <div className="text-sm text-center text-semibold">
                  {it.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
