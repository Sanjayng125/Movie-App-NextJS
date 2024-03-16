import React, { Suspense } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import Loading from "../loading";

const About = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full flex justify-center">
        <div className="w-[90%] max-w-2xl rounded-xl shadow-xl p-3 flex flex-col gap-3">
          <h1 className="text-4xl text-center font-semibold">About</h1>
          <div className="w-max flex flex-col">
            <h1 className="text-xl font-semibold text-center">Sanjay NG</h1>
          </div>
          <ul className="list-disc w-max mx-5">
            <li className="hover:underline hover:text-blue-600 cursor-pointer">
              <a
                className="flex items-center gap-2"
                href="https://github.com/Sanjayng125"
                target="_blank"
              >
                Git-Hub <FaExternalLinkAlt />
              </a>
            </li>
            <li className="hover:underline hover:text-blue-600 cursor-pointer">
              <a
                className="flex items-center gap-2"
                href="https://linkedin.com/in/sanjay-ng-41b64922a"
                target="_blank"
              >
                LinkedIn <FaExternalLinkAlt />
              </a>
            </li>
            <li className="hover:underline hover:text-blue-600 cursor-pointer">
              <a
                className="flex items-center gap-2"
                href="https://x.com/Sanjayng5"
                target="_blank"
              >
                X.com <FaExternalLinkAlt />
              </a>
            </li>
          </ul>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
            aliquam voluptatibus odit, saepe exercitationem autem molestias
            asperiores dolores sit corrupti molestiae ea, facere, totam
            necessitatibus enim quod aliquid. Quisquam, dolor. aliquam
            voluptatibus odit, saepe exercitationem autem molestias asperio
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
            aliquam voluptatibus odit, saepe exercitationem autem molestias
            asperiores dolores sit corrupti molestiae ea, facere, totam
            necessitatibus enim quod aliquid. Quisquam, dolor. aliquam
            voluptatibus odit, saepe exercitationem autem molestias asperio
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
            aliquam voluptatibus odit, saepe exercitationem autem molestias
            asperiores dolores sit corrupti molestiae ea, facere, totam
            necessitatibus enim quod aliquid. Quisquam, dolor. aliquam
            voluptatibus odit, saepe exercitationem autem molestias asperio
          </p>
        </div>
      </div>
    </Suspense>
  );
};

export default About;
