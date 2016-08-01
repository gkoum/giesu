export class Edge {
  id: number;
  from: string;
  to: string;
  label: string;
  constructor(id: number,from: string,to: string,label: string){
    this.id=id;
    this.from=from;
    this.to=to;
    this.label=label;
  }
  get_from():string{
    return this.from;
  }
  get_to():string{
    return this.to;
  }
}
