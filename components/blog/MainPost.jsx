"use client";

import { urlFor } from "@/app/lib/sanity";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

function MainPost({ post }) {
  const imageRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    // Ensure your elements exist
    if (imageRef.current) {
      // Use the ScrollTrigger.create static method to set up the animation
      ScrollTrigger.create({
        trigger: imageRef.current, // Reference to your DOM element
        toggleActions: "play none none none", // Actions: onEnter, onLeave, onEnterBack, onLeaveBack
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onEnter: () =>
          gsap.fromTo(
            imageRef.current,
            { opacity: 0, x: -200 },
            { opacity: 1, x: 0, duration: 0.6, ease: "power1.inOut" },
          ),
      });
    }
    if (textRef.current) {
      ScrollTrigger.create({
        trigger: textRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () =>
          gsap.fromTo(
            textRef.current,
            { opacity: 0, x: +200 },
            { opacity: 1, x: 0, duration: 0.6, ease: "power1.inOut" },
          ),
      });
    }
  }, []);

  function printText(body) {
    let fullBodyText = "";
    body
      .filter((el) => el._type !== "image")
      .map((el) => (fullBodyText = fullBodyText + `${el.children[0].text}@@`));
    fullBodyText = fullBodyText.split(" ").slice(0, 180).join(" ").split("@@");
    return fullBodyText;
  }
  return (
    <section className="container relative mx-auto mb-24 mt-20 flex flex-col items-center justify-between gap-6 px-5 lg:mb-40 lg:mt-40 lg:flex-row lg:gap-24 lg:px-24">
      <div className="relative z-20 w-full opacity-0 lg:w-1/3" ref={imageRef}>
        <Image
          height={800}
          width={800}
          src={urlFor(post.mainImage).url()}
          alt={post.mainImage.alt}
          className="h-[480px] rounded-xl object-cover shadow-md lg:h-[600px]"
        />
        <Image
          src="/waveshape.svg"
          height={200}
          width={200}
          alt="wave img"
          className="absolute left-0 top-0 z-10 -translate-x-[10%] -translate-y-1/2 scale-75 xl:left-auto xl:right-0 xl:translate-x-1/2"
        />
        <p className="absolute left-0 top-0 z-20 -translate-y-1/2 translate-x-1/2 font-spartan text-4xl font-bold text-white xl:left-auto xl:right-0 xl:translate-x-1/2">
          Blog
        </p>
      </div>
      <div className="z-20 flex-1 opacity-0" ref={textRef}>
        <p className="mb-2 text-3xl font-bold capitalize">
          {`${post.title.substring(0, 35)}${post.title.length > 34 ? "..." : ""}`}
        </p>
        <p className="mb-4 text-stone-600">
          <em>
            By {post.name} -{" "}
            {format(new Date(post.publishedAt), "LLLL dd yyyy")}
          </em>
        </p>
        <div className="text-black-800">
          {printText(post?.body).map((el, i) => (
            <p key={el} className={`mb-3`}>
              {`${el} ${i === printText(post?.body).length - 1 ? " ..." : ""}`}
            </p>
          ))}
        </div>
        <div className=" ml-auto mt-4">
          <Link
            href={`/blog/${post.slug.current}`}
            className="cursor-pointer rounded-full bg-primary px-4 py-2 text-white transition-all hover:bg-primary/75"
          >
            Read more
          </Link>
        </div>
      </div>
      <Image
        width={500}
        height={500}
        src="/svgline.svg"
        alt="svg"
        className="absolute -bottom-[10%] right-[6%] -z-10 hidden w-full xl:-bottom-[25%] xl:block"
      />
    </section>
  );
}

export default MainPost;
