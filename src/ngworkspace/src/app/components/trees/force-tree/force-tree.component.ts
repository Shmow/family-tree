import { Component } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-force-tree',
  imports: [],
  templateUrl: './force-tree.component.html'
})
export class ForceTreeComponent {
  private simulation!: d3.Simulation<d3.HierarchyNode<any>, undefined>;
  private svg!: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
  private width = 1000;
  private height = 800;

  data: any;
  private links!: d3.HierarchyLink<any>[];
  private nodes!: d3.HierarchyNode<any>[];

  ngOnInit(): void {
    // Compute the graph and start the force simulation.
    const root = d3.hierarchy(this.data);
    this.links = root.links();
    this.nodes = root.descendants();

    this.createSimulation();
    this.createSvg();
    this.drawForceTree();
  }

  private createSimulation() {
    this.simulation = d3.forceSimulation(this.nodes)
      .force("link", d3.forceLink(this.links).id((d: any) => d.id).distance(0).strength(1))
      .force("charge", d3.forceManyBody().strength(-50))
      .force("x", d3.forceX())
      .force("y", d3.forceY());
  }

  private createSvg(): void {
    // Create the container SVG.
    this.svg = d3.select("figure#force-tree")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("viewBox", [-this.width / 2, -this.height / 2, this.width, this.height])
      .attr("style", "max-width: 100%; height: auto;");
  }

  private drawForceTree() {
    // Append links.
    const link = this.svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(this.links)
      .join("line");

    // Append nodes.
    const node = this.svg.append("g")
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(this.nodes)
      .join("circle")
      .attr("fill", d => d.children ? null : "#000")
      .attr("stroke", d => d.children ? null : "#fff")
      .attr("r", 5)
      .call(this.drag(this.simulation));

    node.append("title")
      .text(d => d.data.name);

    this.simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);
    });

    //invalidation.then(() => simulation.stop());

    return this.svg.node();
  }

  private drag(simulation: d3.Simulation<d3.HierarchyNode<any>, undefined>): any {

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }
}
