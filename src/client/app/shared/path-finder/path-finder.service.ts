import { Injectable } from '@angular/core';
import {Edge} from "../../models/edge";

@Injectable()
export class PathFinderService {
  START:number;
  END:number;
  find(start_node: number, end_node:number,nodesArray:Object[],edgesArray:Object[]): { [key:string]:string[] } {
    for(let e of edgesArray)
      console.log(e.from);
    this.START=start_node;
    this.END=end_node;
    let nodes:Object[]=nodesArray;//=['a','b','c','d','e','f'];
    let tmp_edge:Edge[] = [new Edge(1,'a','b','ab'),new Edge(3,'a','c','ac'), new Edge(2,'b','c','ac'),new Edge(3,'c','d','cd'),new Edge(3,'c','f','cf')];
    let edges:Object[]=edgesArray;

    let neighboors:{ [key:string]:string[] }= this.neighboors_all(edges,nodes);
    let visited:number[]=[this.START];
    this.searchDepth(neighboors,visited);
    return neighboors;
  }
  private searchDepth(neighboors:{ [key:string]:string[] }, visited:number[]){
    console.log('Visited: '+visited);
    //console.log('Nei: '+neighboors['a']);
    let pop_node:number=visited.pop();
    let next_nodes:string[]=neighboors[pop_node];
    visited.push(pop_node);
    //console.log(next_nodes);
    let tmp_node:number;
    if(next_nodes){
      for(tmp_node of next_nodes){
        if(visited.includes(tmp_node))
          continue;
        if(tmp_node==this.END){
          visited.push(tmp_node);
          this.path(visited);
          visited.pop();
          break;
        }
      }
      for(tmp_node of next_nodes){
        if(visited.includes(tmp_node) || tmp_node==this.END)
          continue;
        visited.push(tmp_node);
        this.searchDepth(neighboors,visited);
        visited.pop();
      }
    }
  }
  private path(path:number[]){
    console.log('PATH: '+path);
  }
  private neighboors_all(edges:Edge[],nodes:string[]):{ [key:string]:string[] }{
    let neighboors:{[key:string]:string[]}={};
    let edge:Edge;
    let node:string, tmp_node:string;
    console.log(nodes);
    for(node of nodes){
      console.log('node_id: '+node.id+' node label: '+node.label);
      for(edge of edges){
        tmp_node=edge.from;
        //console.log(edge.from);
        if(tmp_node==node.id){
          if(neighboors[node.id]==null){
            neighboors[node.id]=[];
            neighboors[node.id].push(edge.to);
          }else{
            neighboors[node.id].push(edge.to);
          }
        }
      }
      for(let n of neighboors){
        console.log(n);
      }
      console.log(neighboors);
    }
    return neighboors;
  }
  private handleError (error: any) {

  }
}
