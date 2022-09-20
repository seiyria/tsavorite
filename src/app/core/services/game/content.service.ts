import { Injectable } from '@angular/core';

import { set } from 'lodash';

import { Archetype, Background, ItemConfig } from '../../../../../content/interfaces';

import * as items from '../../../../../content/items/items.json';
import * as archetypes from '../../../../../content/archetypes/archetypes.json';
import * as backgrounds from '../../../../../content/backgrounds/backgrounds.json';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  public get archetypes(): Archetype[] {
    return (archetypes as any).default || archetypes;
  }

  public get backgrounds(): Background[] {
    return (backgrounds as any).default || backgrounds;
  }

  public get items(): ItemConfig[] {
    return (items as any).default || items;
  }

  constructor() { }

  // getters
  public getArchetype(name: string): Archetype | undefined {
    return this.archetypes.find(x => x.name === name);
  }

  public getBackground(name: string): Background | undefined {
    return this.backgrounds.find(x => x.name === name);
  }

  public getItem(itemName: string): ItemConfig | undefined {
    return this.items.find(x => x.name === itemName);
  }

  // formatters
  public reformatItem(itemName: string, modifications: Record<string, number>): ItemConfig {
    const realItem = this.getItem(itemName);
    if(!realItem) return;

    // run the modifications through lodash.set for quick deep setting
    const workingItem = structuredClone(realItem);
    Object.keys(modifications || {}).forEach(mod => {
      set(workingItem, mod, modifications[mod]);
    });

    return workingItem;
  }
}
