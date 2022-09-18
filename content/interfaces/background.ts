
export interface BackgroundKitItem {
  description: string;
  icon: string;
  itemName: string;
  itemChanges: Record<string, number>;
}

export interface Background {
  name: string;
  icon: string;
  disabled?: boolean;
  realName: string;
  description: string;
  archetype: string;
  goal: string;
  startingKit: BackgroundKitItem[];
}
