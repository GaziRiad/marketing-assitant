// import { format } from "date-fns";
// import SanityBlockContent from "@sanity/block-content-to-react";

import { urlFor } from "@/app/lib/sanity";
import { format } from "date-fns";
import Image from "next/image";

function MainPost({ post }) {
  function printText(body) {
    let fullBodyText = "";
    body
      .filter((el) => el._type !== "image")
      .map((el) => (fullBodyText = fullBodyText + `${el.children[0].text}@@`));
    fullBodyText = fullBodyText.split(" ").slice(0, 180).join(" ").split("@@");
    return fullBodyText;
  }
  return (
    <section className="container mx-auto mb-40 mt-20 flex flex-col items-center justify-between gap-6 px-5 lg:flex-row lg:gap-24 lg:px-24">
      <div className="relative w-full lg:w-1/3">
        <Image
          height={800}
          width={800}
          src={urlFor(post.mainImage).url()}
          alt={post.mainImage.alt}
          className="h-[600px] rounded-xl object-cover"
        />
        <Image
          src="/waveshape.svg"
          height={200}
          width={200}
          alt="wave img"
          className="absolute left-0 top-0 z-10 -translate-x-[10%] -translate-y-1/2 scale-75 xl:left-auto xl:right-0 xl:translate-x-1/2"
        />
        <p className="absolute left-0 top-0 z-20 -translate-y-1/2 translate-x-1/2 text-4xl font-bold text-white xl:left-auto xl:right-0 xl:translate-x-1/2">
          Blog
        </p>
      </div>
      <div className="flex-1">
        <p className="mb-2 text-3xl font-bold capitalize">
          {`${post.title.substring(0, 35)}...`}
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
          <button
            // to={`/blog/${post.slug.current}`}
            className="cursor-pointer rounded-full bg-primary px-4 py-2 text-white transition-all hover:bg-primary/75"
          >
            Read more
          </button>
        </div>
      </div>
    </section>
  );
}

export default MainPost;
