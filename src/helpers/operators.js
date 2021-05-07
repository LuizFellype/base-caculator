export const operators = {
    "^": "^",
    v: "v",
    "#": "#",
    "->": "->",
    "<->": "<->",
}
export const operatorsLabeled = [
    {
      id: operators["^"],
      label: "^ (E)",
      link:
        "https://www.flaticon.com/br/premium-icon/icons/svg/3512/3512324.svg",
    },
    {
      id: operators["v"],
      label: "v (OU inclusivo)",
      link:
        "https://www.flaticon.com/br/premium-icon/icons/svg/3512/3512387.svg",
    },
    {
      id: operators["#"],
      label: "# (OU exclusivo)",
      link:
        "https://www.flaticon.com/br/premium-icon/icons/svg/3512/3512522.svg",
    },
    { id: operators["->"], label: "-> (Condicional)", link: "" },
    { id: operators["<->"], label: "<-> (Bicondicional)", link: "" },
  ]

export const operatePortLogic = (value1, selectedOperator, value2) => ({
    [operators["^"]]: () => !!(value1 && value2),
    [operators["v"]]: () => !!(value1 || value2),
    [operators["#"]]: () =>
        (value1 && value2) || (!value1 && !value2) ? false : true,
    [operators["->"]]: () => !(value1 && !value2),
    [operators["<->"]]: () => !!(value1 ? value2 : !value2),
}[selectedOperator]())