import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { MARKS, BLOCKS, INLINES } from "@contentful/rich-text-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";

const client = createClient({
  space: process.env.CONTENTFULL_SPACE_PROJECT,
  accessToken: process.env.CONTENTFULL_TOKEN_PROJECT,
});

export async function getStaticPaths() {
  const res = await client.getEntries({ content_type: "project" });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "project",
    "fields.slug": params.slug,
  });

  return {
    props: {
      projects: items[0],
    },
    revalidate: 1,
  };
}

function index({ projects }) {
  if (!projects) return <div>Loading...</div>;
  return (
    <div key={projects.fields.title}>
      <title>{"yudha • " + projects.fields.title}</title>
      <h1 className="font-sans font-bold dark:text-white text-black sm:text-5xl text-3xl my-10 tracking-tight">
        {projects.fields.title}
      </h1>
      <div className="my-10">
        {projects.fields.label
          .slice(0)
          .reverse()
          .map((item) => (
            <span
              className="bg-gray-600 text-center shadow-md text-white rounded-2xl text-sm p-2 font-sans font-normal mx-1"
              key={item}
            >
              {item}
            </span>
          ))}
      </div>
      <div>
        <img
          className="rounded-lg"
          src={"https:" + projects.fields.header.fields.file.url}
        ></img>
      </div>
      <div>
        {documentToReactComponents(projects.fields.content, {
          renderMark: {
            [MARKS.CODE]: (children) => {
              return (
                <SyntaxHighlighter
                  lineProps={{ style: { paddingBottom: 8 } }}
                  wrapLines={true}
                  language="javascript"
                  style={nord}
                  showLineNumbers
                >
                  {children}
                </SyntaxHighlighter>
              );
            },
          },

          renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node) => (
              <div className="my-2 sm:my-5">
                <img src={"https:" + node.data.target.fields.file.url}></img>
                <p className="dark:text-gray-300 text-gray-700 font-light text-md">
                  {node.data.target.fields.title}
                </p>
              </div>
            ),
            [BLOCKS.HEADING_2]: (node, children) => (
              <h2 className="text-lg sm:text-2xl dark:text-white text-black font-bold mt-5 mb-2 sm:mt-10 sm:mb-5">
                {children}
              </h2>
            ),
            [BLOCKS.PARAGRAPH]: (node, children) => (
              <div className="text-md sm:text-lg dark:text-gray-300 text-gray-700 my-2 sm:my-5">
                {children}
              </div>
            ),
            [BLOCKS.LIST_ITEM]: (node) => (
              <li className="text-md sm:text-lg dark:text-gray-300 text-gray-700">
                <ol>- {node.content[0].content[0].value}</ol>
              </li>
            ),
            [INLINES.HYPERLINK]: (node, children) => (
              <a
                href={node.data.uri}
                className="text-md sm:text-lg dark:text-myorange text-myorangelight my-2 sm:my-5 hover:underline"
              >
                {children}
              </a>
            ),
          },
        })}
      </div>
    </div>
  );
}

export default index;
