import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory
} from '@angular/core';

import { MoviesService } from '../../movies.service';
import { NowShowingComponent } from '../now-showing/now-showing.component';
import { UpcomingComponent } from '../upcoming/upcoming.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class MoviesComponent implements OnInit {
  @ViewChild('nowShowingTemplate', { read: ViewContainerRef }) entryNowShowing: ViewContainerRef;
  @ViewChild('upComingTemplate', { read: ViewContainerRef }) entryUpcoming: ViewContainerRef;
  componentRef: any;
  changeComp;
  constructor(
    private resolver: ComponentFactoryResolver
  ) { }

  /**
   * Ng On Init
   */
  ngOnInit() {
    this.changeComp = 0;
    this.loadComponent(0, 'onLoad');
  }

  /**
   * Load Component
   * @param index - Index number
   */
  loadComponent(index, type) {
    this.destroyComponent();
    this.entryNowShowing.clear();
    this.entryUpcoming.clear();
    if (index === 0) {
      const factory = this.resolver.resolveComponentFactory(NowShowingComponent);
      this.componentRef = this.entryNowShowing.createComponent(factory);
    } else {
      const factory = this.resolver.resolveComponentFactory(UpcomingComponent);
      this.componentRef = this.entryUpcoming.createComponent(factory);
    }
    this.componentRef.instance.loadType = type;
    this.componentRef.instance.changeCount = this.changeComp;
  }

  /**
   * Destry component
   */
  destroyComponent() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onTabChange(event) {
    this.changeComp ++;
    this.loadComponent(event.index, 'onChange');
  }

  changeFilter(filterData) {
    if (Object.keys(filterData).indexOf('language') > -1) {
      this.componentRef.instance.filterObj = filterData;
    }
  }

}
