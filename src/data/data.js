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

export const colorIdentsMap = {}

colorIdents.forEach(identObject=>{
  colorIdentsMap[identObject.ident] = identObject.props.color
})

export const generatedItems = Array.from({ length: 10 }, (_, i) => {
  return {
    id: { name: crypto.randomUUID(), color: "orange", selectedColumn: false },
    title: {
      name: `${Math.floor(Math.random() * 999)
        .toString()
        .padStart(4, "0")} Original title`,
      color: "yellow",
      selectedColumn: false,
    },
    description: {
      name: `${Math.floor(Math.random() * 999)
        .toString()
        .padStart(4, "0")} Much more original description`,
      color: "pink",
      selectedColumn: false,
    },
    color: colorIdents[Math.floor(Math.random() * colorIdents.length)].props.color,
    colorIdent: colorIdents[Math.floor(Math.random() * colorIdents.length)].ident,
    selected: false,
  };
});
