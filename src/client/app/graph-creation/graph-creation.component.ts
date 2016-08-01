import { Component, ElementRef  } from '@angular/core';
import {JSONP_PROVIDERS} from '@angular/http';
import {NdfService} from "../shared/ndf/ndf.service";
import {Observable} from "rxjs/Rx";
import {PathFinderService} from "../shared/path-finder/path-finder.service";


declare var vis: any;

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'graph-creation',
  templateUrl: 'graph-creation.component.html',
  styleUrls: ['graph-creation.component.css'],
  providers: [JSONP_PROVIDERS, NdfService, PathFinderService]
})
export class GraphCreationComponent {
  constructor (private ndfService: NdfService, private pathFinder: PathFinderService) {}

  items: Observable<string[]>;
  errorMessage: string;
  network:any;
  nodesArray:any[];
  edgesArray:any[];
  concept_info: string='';
  getNdf(){
    this.ndfService.get()
      .subscribe(
        items => this.items = <any>items,
        error =>  this.errorMessage = <any>error);
    console.log("evfer");
  }

  elementRef: ElementRef;

 /* constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }*/

  ngOnInit(){
    console.log("afterViewInit() called");
    let nodesArray:any[]=[];
    let edgesArray:any[]=[];
    nodesArray.push({id: 1, label: "Drug"},{id: 2, label: "Dosage"},{id: 3, label: "Target"},{id: 4, label: "Mutation"},{id: 5, label: "Organ"},{id: 6, label: "Cellular_Component"},{id: 7, label: "Disease"},{id: 8, label: "Adverse_Effect"});
    edgesArray.push({from: 1, to: 2, label:"has_dosage", arrows:'to'},{from: 2, to: 5, label:"is_toxic_for", arrows:'to'},{from: 1, to: 3, label:"binds_to", arrows:'to'},{from: 3, to: 6, label:"part_of", arrows:'to'},{from: 6, to: 5, label:"part_of", arrows:'to'},{from: 5, to: 7, label:"subject_of", arrows:'to'},{from: 1, to: 8, label:"causes", arrows:'to'},{from: 7, to: 3, label:"affects", arrows:'to'},{from: 1, to: 7, label:"treats/prevents...", arrows:'to'},{from: 3, to: 4, label:"has_mutation", arrows:'to'},{from: 7, to: 6, label:"affects", arrows:'to'});
    this.pathFinder.find(1,7,nodesArray,edgesArray);
    for(let e of edgesArray)
      console.log(e.from);
    let network:any = null;
    let options:any = {interaction:{hover:true},
      physics: {
        enabled: false
      }};
    this.nodesArray=nodesArray;
    this.edgesArray=edgesArray;
    var nodes = new vis.DataSet(nodesArray);
    var edges = new vis.DataSet(edgesArray);
    var container = document.getElementById('mynetwork'); //element ref.....
    var data = {
      nodes: nodes,
      edges: edges
    };
    this.getNdf();
    this.network = new vis.Network(container, data, options);
    this.draw(2);
    //this.draw(2);
    //d3.select(this.elementRef.nativeElement).select("h1").style("background-color", "yellow");
  }
  private destroy() {
    let network=this.network;
    if (network !== null) {
      network.destroy();
      network = null;
    }
  }
  private draw(num) {
    this.destroy();
    this.nodesArray = new vis.DataSet(this.nodesArray);
    this.edgesArray = new vis.DataSet(this.edgesArray);
    console.log(this.nodesArray);
    var data = {
      nodes: this.nodesArray,
      edges: this.edgesArray
    };
    // create a network
    var container = document.getElementById('mynetwork');
    var options = {
      /*layout: {
       hierarchical: {
       direction: "UD",
       sortMethod: "directed"
       }
       },*/
      interaction:{hover:true},
      physics: {
        enabled: false
      },
      //layout: {randomSeed:seed}, // just to make sure the layout is the same when the locale is changed
      //locale: document.getElementById('locale').value,
      manipulation: {
        addNode: function (data, callback) {
          // filling in the popup DOM elements
          document.getElementById('operation').innerHTML = "Add Node";
          //document.getElementById('node-id').value = data.id;
          //document.getElementById('node-label').value = data.label;
          document.getElementById('saveButton').onclick = this.saveData.bind(this, data, callback);
          document.getElementById('cancelButton').onclick = this.clearPopUp.bind();
          document.getElementById('network-popUp').style.display = 'block';
        },
        editNode: function (data, callback) {
          // filling in the popup DOM elements
          document.getElementById('operation').innerHTML = "Edit Node";
          //document.getElementById('node-id').value = data.id;
          //document.getElementById('node-label').value = data.label;
          document.getElementById('saveButton').onclick = this.saveData.bind(this, data, callback);
          document.getElementById('cancelButton').onclick = this.cancelEdit.bind(this,callback);
          document.getElementById('network-popUp').style.display = 'block';
        },
        addEdge: function (data, callback) {
          if (data.from == data.to) {
            var r = confirm("Do you want to connect the node to itself?");
            if (r == true) {
              callback(data);
            }
          }
          else {
            callback(data);
          }
        }
      }
    };
    this.network = new vis.Network(container, data, options);
    this.network.on("select", function (params) {
      console.log('select Edge:', params);
      this.concept_info='doubleclick_on _node';
      console.log(this.concept_info);
      /*console.log('from:', this.edges._data[params.edges[0]].from);
      console.log('to:', this.edges._data[params.edges[0]].to);
      console.log('select Node:', this.nodes._data[params.nodes[0]].label);*/
      /*document.getElementById("multi_search").
      ("Search for <span class='highlight' id='concept_add_to_search'>"+
      this.nodes._data[params.nodes[0]].label+"</span> or more specific concepts:<a href='javascript:add_to_search_input();' id='link_add_to_search'></a>");*/
    });
    this.network.on("doubleClick", function (params) {
      params.event = "[original event]";
      this.concept_info='doubleclick_on _node';
      console.log(JSON.stringify(params, null, 4));
      console.log('dc:', params);
      //$('#ontology_class').val(this.nodes._data[params.nodes[0]].label);
      alert(this.nodes._data[params.nodes[0]].label);
      //------------getAllInfo();
    });
}

  private clearPopUp() {
  document.getElementById('saveButton').onclick = null;
  document.getElementById('cancelButton').onclick = null;
  document.getElementById('network-popUp').style.display = 'none';
}

  private cancelEdit(callback) {
  this.clearPopUp();
  callback(null);
}

  private saveData(data,callback) {
  //data.id = document.getElementById('node-id').value;
  //data.label = document.getElementById('node-label').value;
    this.clearPopUp();
  callback(data);
}
}
