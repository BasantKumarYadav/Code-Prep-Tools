export const siteConfig = {
  name: "CodePrepTools",
  url: "https://codepreptools.com",
  description:
    "Free developer tools and interview preparation resources for software developers.",
  author: "CodePrepTools",
};

export const navigation = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Developer Tools",
    href: "/developer-tools",
  },
  {
    label: "Interview Prep",
    href: "/interview",
    disabled: true,
  },
];

export const toolCategories = [
  {
    title: "JSON Tools",
    description: "Tools for working with JSON data.",
    tools: [
      {
        name: "JSON Formatter",
        description:
          "Format, validate and minify JSON directly in your browser.",
        href: "/tools/json-formatter",
      },
    ],
  },
];