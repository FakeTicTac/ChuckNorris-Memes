import { route } from 'aurelia';
import { AppState } from './state/app-state';


/**
 * Routing Table. Enable Users To Navigate To Different Views.
 */
 @route({
  routes: [
    {
      id: 'home',
      path: [''],
      component: import('./view/home/home'),
      title: "Chucks' Home"
    },
    {
      id: 'category1',
      path: ['/category1'],
      component: import('./view/category-one/category-one'),
      title: "Chucks' Jokes - First Category"
    },
    {
      id: 'category2',
      path: '/category2',
      component: import('./view/category-two/category-two'),
      title: "Chucks' Jokes - Second Category",
    },
    {
      id: 'category3',
      path: '/category3',
      component: import('./view/category-three/category-three'),
      title: "Chucks' Jokes - Third Category",
    }
  ]
})


/**
 * Class Represents The Core of The Web Application. (Mainly Home Page)
 */
export class MyApp { 

  /**
   * Basic Constructor. Defines Application State Connection.
   * @param {AppState} appState Defines Application State Connection.
   */
  constructor(private appState : AppState) { }
  
}