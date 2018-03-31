import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core';

@Injectable()
export class MenuService {
    @Output() navchange: EventEmitter<String> = new EventEmitter();
    menuActivo:boolean=false;
    constructor() {}
    emitNavChangeEvent(str) {
      this.navchange.emit(str);
    }
    getNavChangeEmitter() {
      return this.navchange;
    }
    getMenuActivo()
    {
      return this.menuActivo;
    }
    setMenuActivo()
    {
      this.menuActivo=true;
    }

  }