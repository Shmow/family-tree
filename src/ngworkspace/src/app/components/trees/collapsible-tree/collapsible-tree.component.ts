import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { LeafletMapService } from '../../../services/leaflet-map.service';

@Component({
  selector: 'app-collapsible-tree',
  templateUrl: './collapsible-tree.component.html'
})
export class CollapsibleTreeComponent implements OnInit {
  @Input({ required: true }) data: any;

  private margin = { top: 20, right: 90, bottom: 30, left: 90 };
  private width = 1200 - this.margin.left - this.margin.right;
  private height = 1200 - this.margin.top - this.margin.bottom;
  private duration = 750;
  private iterator = 0;

  private svg!: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;
  private treeMap!: d3.TreeLayout<unknown>;
  private rootNode!: d3.HierarchyNode<unknown>;

  constructor(private leafletMapService: LeafletMapService) { }

  ngOnInit(): void {
    this.createSvg();

    // declares a tree layout and assigns the size
    this.treeMap = d3.tree().size([this.height, this.width]);

    this.createRootNode();

    this.update(this.rootNode);
  }

  private createSvg(): void {
    this.svg = d3.select("figure#collapsible-tree")
      .append("svg")
      .attr("id", "family-tree-svg")
      .attr("width", "100%")
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", `translate(${this.margin.left},${this.margin.top})`) as any;
  }

  private createRootNode() {
    const parsedJson = JSON.parse(this.data);

    this.rootNode = d3.hierarchy(parsedJson, (d: any) => d.parents);

    Object.defineProperty(this.rootNode, "x0", { value: this.height / 2, writable: true });
    Object.defineProperty(this.rootNode, "y0", { value: 0, writable: true });

    // Collapse after the second level
    this.rootNode.children!.forEach((c: any) => this.collapse(c));
    this.collapse(this.rootNode);
    setTimeout(() => this.leafletMapService.getGeoAndDropPin(parsedJson?.birthplace), 2000);
  }

  private update(source: any) {
    // Assigns the x and y position for the nodes
    let treeData = this.treeMap(this.rootNode);

    // Compute the new tree layout.
    let nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach((d: any) => { d.y = d.depth * 180; });

    // ****************** Nodes section ***************************

    // Update the nodes...
    let node = this.svg.selectAll('g.node')
      .data(nodes, (d: any) => d.id || (d.id = ++this.iterator)) as any;

    // Enter any new modes at the parent's previous position.
    let nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node noselect')
      .attr("transform", (d: any) => `translate(${source.y0},${source.x0})`)
      .on('click', (_d: any, e: any) => this.click(e));

    // Add rect for the nodes
    let rectHeight = 60, rectWidth = 150;

    nodeEnter.append('rect')
      .attr('class', 'node')
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .attr("x", 0)
      .attr("y", (rectHeight / 2) * -1)
      .attr("rx", "5")
      .style("fill", (d: any) => d.data.fill);

    // Add labels for the nodes
    let text = nodeEnter.append('text')
      .attr("dy", "-.95em")
      .attr("x", (d: any) => 10)
      .attr("text-anchor", (d: any) => "start")
      .text((d: any) => d.data.name)

    text.append("tspan")
      .attr('class', 'subtext')
      .attr("dy", "1.75em")
      .attr("x", (d: any) => 10)
      .text((d: any) => `${d.data.dob} ${d.data.birthplace}`)

    text.append("tspan")
      .attr('class', 'subtext')
      .attr("dy", "1.75em")
      .attr("x", (d: any) => 10)
      .text((d: any) => d.data.dod ? `✝ ${d.data.dod}` : '');

    // UPDATE
    let nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate.transition()
      .duration(this.duration)
      .attr("transform", (d: any) => `translate(${d.y},${d.x})`);

    // Update the node attributes and style
    nodeUpdate.select('rect.node')
      .attr('r', 10)
      .style("fill", (d: any) => d._children ? "lightsteelblue" : "#fff")
      .attr('cursor', 'pointer');


    // Remove any exiting nodes
    let nodeExit = node.exit().transition()
      .duration(this.duration)
      .attr("transform", (d: any) => `translate(${source.y},${source.x})`)
      .remove();

    // On exit reduce the node rect size to 0
    nodeExit.select('rect')
      .attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    // ****************** links section ***************************

    // Update the links...
    let link = this.svg.selectAll('path.link')
      .data(links, (d: any) => d.id) as any;

    // Enter any new links at the parent's previous position.
    let linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', (d: any) => {
        let o = { x: source.x0, y: source.y0 };
        return this.diagonal(o, o);
      });

    // UPDATE
    let linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate.transition()
      .duration(this.duration)
      .attr('d', (d: any) => { return this.diagonal(d, d.parent) });

    // Remove any exiting links
    let linkExit = link.exit().transition()
      .duration(this.duration)
      .attr('d', (d: any) => {
        let o = { x: source.x, y: source.y };
        return this.diagonal(o, o);
      })
      .remove();

    // Store the old positions for transition.
    nodes.forEach((d: any) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  private diagonal(s: any, d: any) {
    let path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`

    return path;
  }

  // Toggle children on click.
  private click(d: any) {
    if (d.children) {
      // collapse
      d._children = d.children;
      d.children = null;
    } else {
      // expand
      d.children = d._children;
      d._children = null;

      if (d.data?.parents) {
        d.data?.parents.forEach((parent: any, indx: number) => {
          setTimeout(() => this.leafletMapService.getGeoAndDropPin(parent?.birthplace), 2000 * (indx + 1));
        });
      }
    }

    this.update(d);
  }

  private collapse(d: any): void {
    if (d.children) {
      d._children = d.children
      d._children.forEach((c: any) => this.collapse(c))
      d.children = null
    }
  }
}
