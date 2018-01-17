export default class Building {
  name = 'building';
  attributes = [
    {name: "id", hide: true},
    {name: "name", label: "Name", type: "string"},
    {name: "services", label: "Services", type: "autocomplete", params: {base: "service"}}
  ];

  constructor () {
    this.collection = [
      {id: 1, name: "Ed. Princilpal", label: "ed principal"},
      {id: 2, name: "Ed. Secundario", label: "ed secundario"},
      {id: 3, name: "Ed. Terciario", label: "ed terciario"}
    ]
  }
}
