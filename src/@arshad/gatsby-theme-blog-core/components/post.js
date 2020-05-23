import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Img from "gatsby-image";
import slugify from "slugify";
import { Link } from "gatsby";
import Layout from "@arshad/gatsby-theme-phoenix/src/components/layout";
import { DiscussionEmbed } from "disqus-react";

export default ({ title, excerpt, image, tags, caption, date, body, slug }) => {
  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: slug, title },
  };

  const tagLinks = tags
    ? tags.map((tag, i) => {
        const divider = i < tags.length - 1 && <span>{`, `}</span>;
        return (
          <span key={`tag-${i}`}>
            <Link
              to={`/blog/tags/${slugify(tag.toLowerCase())}`}
              className="text-dark font-bold underline dark:text-white"
            >
              {tag}
            </Link>
            {divider}
          </span>
        );
      })
    : null;

  return (
    <Layout>
      <article className="post mb-12 md:mb-24">
        <div className="text-center lg:w-4/5 mx-auto">
          <p className="small">{date}</p>
          <h1 className="mt-2">
            <span>{title}</span>
          </h1>
          {excerpt && <p className="lead mt-4">{excerpt}</p>}
        </div>

        {image.full && (
          <figure className="mt-8 mb-10 md:mt-16 mt:mb-20">
            <Img
              fluid={image.full.fluid}
              className="rounded-sm"
              title={title}
              alt={caption || title}
            />
            {caption && (
              <figcaption dangerouslySetInnerHTML={{ __html: caption }} />
            )}
          </figure>
        )}

        <div className="lg:w-4/5 my-6 mx-auto content">
          {body && <MDXRenderer>{body}</MDXRenderer>}
        </div>

        <div className="lg:w-4/5 mx-auto">
          {tags && (
            <div className="text-sm mt-8 pt-8 md:mt-16 md:pt-16 border-t border-offwhite dark:border-text text-text dark:text-white">
              Tagged with {tagLinks}
            </div>
          )}
        </div>

        <div className="lg:w-4/5 mx-auto">
          <div className="text-sm mt-8 pt-8 md:mt-16 md:pt-16 border-t border-offwhite dark:border-text text-text dark:text-white">
            <DiscussionEmbed {...disqusConfig} />
          </div>
        </div>
      </article>
    </Layout>
  );
};
