export function StepDescription({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div>{children}</div>
      <div>
        If you’re stumped,{" "}
        <a
          className="text-blue-500 active:underline hover:underline"
          href="https://zipperrescue.com/wizard-help-form/"
          target="_top"
        >
          use this help form
        </a>{" "}
        to send us a photo.
      </div>
    </div>
  );
}
