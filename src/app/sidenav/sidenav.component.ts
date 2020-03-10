import { Component,OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserLogin } from '../users/UserLogin';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
 
interface FoodNode {
  Titulo: string;
  SubTitulo?: FoodNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  Titulo: string;
  level: number;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  providers:[UserLogin]
})

export class SidenavComponent {
 user: UserLogin
 screens: any
  TREE_DATA: FoodNode[] = [
  {
    Titulo: 'Fruit',
    SubTitulo: [
      { Titulo: 'Apple' },
      { Titulo: 'Banana' },
      { Titulo: 'Fruit loops' },
    ]
  }, {
    Titulo: 'Vegetables',
    SubTitulo: [
      {
        Titulo: 'Green',
        SubTitulo: [
          { Titulo: 'Broccoli' },
          { Titulo: 'Brussels sprouts' },
        ]
      }, {
        Titulo: 'Orange',
        SubTitulo: [
          { Titulo: 'Pumpkins' },
          { Titulo: 'Carrots' },
        ]
      },
    ]
  },
];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    private _transformer = (node: FoodNode, level: number) => {
      return {
        expandable: !!node.SubTitulo && node.SubTitulo.length > 0,
        Titulo: node.Titulo,
        level: level,
      };
    }

    treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

      treeFlattener = new MatTreeFlattener(
        this._transformer, node => node.level, node => node.expandable, node => node.SubTitulo);
    
      dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
   
      hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  constructor(private breakpointObserver: BreakpointObserver, user: UserLogin) {
    this.user = user;
    this.dataSource.data = this.TREE_DATA;
    this.user.getScreensByRule().subscribe(data => {this.dataSource.data = data})
   
  }

  ngOnInit(){
    
    //this.user.getScreensByRule().subscribe(data => {this.dataSource.data = data})
  }

}
