import { Action } from '../action/action';

export interface Card {
  id: number;
  name: string;
  description: string;
  cost: number;
  strength: number;
  colors: string[];
  kind: string;
  actions: Action[];
}

const COLOR_TAGS = ['Red', 'Green', 'Blue', 'Yellow', 'Black'];

function getKind(tags: string[]): string {
  if (tags.includes('HasUnit')) {
    return 'Unit';
  } else if (tags.includes('Spell')) {
    return 'Spell';
  } else {
    return 'Basic';
  }
}

export function fromCardEntity(id: number, entity: any, tags: string[]): Card {
  const components = entity.components;
  return {
    id,
    name: components.Common.name,
    description: components.Common.description,
    cost: components.Card?.cost || 0,
    strength: components.HasUnit?.strength || 0,
    kind: getKind(tags),
    colors: tags.filter((t) => COLOR_TAGS.includes(t)).sort((a, b) => COLOR_TAGS.indexOf(a) - COLOR_TAGS.indexOf(b)),
    actions: [],
  };
}
