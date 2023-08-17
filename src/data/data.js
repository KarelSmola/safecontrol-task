const colorIdents = [
  {
    ident: "un",
    props: {
      color: "red",
    },
  },
  {
    ident: "deux",
    props: {
      color: "green",
    },
  },
  {
    ident: "trois",
    props: {
      color: "blue",
    },
  },
];

const generatedItems = Array.from({ length: 1000 }, (_, i) => {
  return {
    id: crypto.randomUUID(),
    title: `${Math.floor(Math.random() * 999)
      .toString()
      .padStart(4, "0")} Original title`,
    description: `${Math.floor(Math.random() * 999)
      .toString()
      .padStart(4, "0")} Much more original description`,
    color:
      colorIdents[Math.floor(Math.random() * colorIdents.length)].props.color,
    selected: false,
  };
});

export default generatedItems;
