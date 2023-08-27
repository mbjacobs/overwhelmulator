import perfectionist from "eslint-plugin-perfectionist";

export default [
  {
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-objects": [
        "error",
        {
          type: "natural",
          order: "asc",
        },
      ],
    },
  },
];
