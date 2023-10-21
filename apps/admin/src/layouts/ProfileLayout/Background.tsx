import { User } from "@teslo/interfaces";
import * as React from "react";

interface IBackgroundProfileLayoutProps {
  user: Partial<User>;
}

const BackgroundProfileLayout: React.FunctionComponent<IBackgroundProfileLayoutProps> = (props) => {
  const {} = props;
  return (
    <section className="relative block h-[500px]">
      <div
        className="absolute top-0 w-full h-full bg-center bg-cover rounded"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")',
        }}
      >
        <span id="blackOverlay" className="w-full h-full absolute opacity-50 rounded bg-black" />
      </div>
      <div
        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
        style={{ transform: "translateZ(0px)" }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x={0}
          y={0}
        >
          <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100" />
        </svg>
      </div>
    </section>
  );
};

export default BackgroundProfileLayout;
