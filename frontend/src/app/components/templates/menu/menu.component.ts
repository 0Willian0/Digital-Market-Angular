import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppState } from '../../../config/store/app.reducer';
import { selectIsMenuVisible } from '../../../config/store/app.selectors';


@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  imports: [FormsModule, NzIconModule, NzInputModule, NzTreeModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {
  private baseApiUrl = 'http://localhost:3001';
  treeData: NzTreeNodeOptions[] = [];
  filteredTreeData: NzTreeNodeOptions[] = [];
  treeFilter: string = '';
  isMenuVisible$: Observable<boolean>; 
  icon: string = ''; 

  constructor(private store: Store<{ app: AppState }>,private http: HttpClient,
    private router: Router,) {
      this.isMenuVisible$ = this.store.select(selectIsMenuVisible);
  }
  
  ngOnInit(): void {
    this.fetchTreeData();
  }
  
  fetchTreeData(): void {
    const url = `${this.baseApiUrl}/categories/tree`;
    this.http.get(url).pipe(
      tap((data: any) => {
        this.treeData = this.formatTreeData(data);  
        this.filteredTreeData = [...this.treeData]; 
      }),
      catchError((error) => {
        console.error('Erro ao buscar dados:', error);
        return of([]); 
      })
    ).subscribe();
  }


  formatTreeData(nodes: any[]): NzTreeNodeOptions[] {
    return nodes.map(node => ({
      key: node.id,
      title: node.name,
      children: node.children ? this.formatTreeData(node.children) : []
    }));
  }


  onNodeSelect(event: any): void {
    const node = event.node;
    if (node && node.key) {
      this.router.navigate([`/categories/${node.key}/products`]);
    } else {
      console.error('ID do nó não encontrado:', node);
    }
  }


  onFilterChange(value: string): void {
    this.treeFilter = value;
    this.filterTreeData(value);  
  }


  filterTreeData(filter: string): void {
    const filterNodes = (nodes: NzTreeNodeOptions[]): NzTreeNodeOptions[] => {
      return nodes
        .map(node => ({
          ...node,
          children: filterNodes(node.children || [])
        }))
        .filter(node =>
          node.title.toLowerCase().includes(filter.toLowerCase()) || (node.children && node.children.length > 0)
        );
    };

    this.filteredTreeData = filter ? filterNodes(this.treeData) : [...this.treeData];
  }
}
