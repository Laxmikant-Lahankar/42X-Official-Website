import { ReactNode } from "react";

export const Customsection = ({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <section
      id={id}
      className="relative w-full border-b border-t border-dashed border-white/12"
    >
      <div
        className={`relative mx-auto w-full max-w-[1250px] border-l border-r border-dashed border-white/12 ${className}`}
      >
        {children}
      </div>
    </section>
  );
};
