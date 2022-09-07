
import { getDescriptorLevel, getInteractionLevel, getReaction } from '../helpers';
import { Interaction, Descriptor, ItemConfig } from '../interfaces';

test('A level 2 carver should bleed a level 2 meat', () => {

  const carver: ItemConfig = {
    name: 'Level 2 Carver',
    parts: [],
    interaction: { name: Interaction.Carves, level: 2 }
  };

  const meat: ItemConfig = {
    name: 'Level 2 Meat',
    parts: [
      {
        name: 'Haunch',
        descriptors: {
          [Descriptor.Meat]: { level: 2 }
        }
      }
    ]
  };

  const result = getReaction(Interaction.Carves, Descriptor.Meat)({
    sourceAction: Interaction.Carves,
    sourceItem: carver,
    targetItem: meat
  });

  expect(result.success).toBe(true);
  expect(getInteractionLevel(result.newSource, Interaction.Carves)).toEqual(1);
  expect(result.newTarget.parts.length).toBe(2);
  expect(getDescriptorLevel(result.newTarget, Descriptor.Meat)).toEqual(1);
  expect(getDescriptorLevel(result.newTarget, Descriptor.Bloody)).toEqual(1);

});

test('A level 2 carver should bleed a level 2 meat and add blood to the blood pile', () => {

  const carver: ItemConfig = {
    name: 'Level 2 Carver',
    parts: [],
    interaction: { name: Interaction.Carves, level: 2 }
  };

  const meat: ItemConfig = {
    name: 'Level 2 Meat',
    parts: [
      {
        name: 'Haunch',
        descriptors: {
          [Descriptor.Meat]: { level: 2 }
        }
      },
      {
        name: 'Blood',
        descriptors: {
          [Descriptor.Bloody]: { level: 2 }
        }
      }
    ]
  };

  const result = getReaction(Interaction.Carves, Descriptor.Meat)({
    sourceAction: Interaction.Carves,
    sourceItem: carver,
    targetItem: meat
  });

  expect(result.success).toBe(true);
  expect(getInteractionLevel(result.newSource, Interaction.Carves)).toEqual(1);
  expect(result.newTarget.parts.length).toBe(2);
  expect(getDescriptorLevel(result.newTarget, Descriptor.Meat)).toEqual(1);
  expect(getDescriptorLevel(result.newTarget, Descriptor.Bloody)).toEqual(3);

});

test('A level 1 carver should break after bleeding any meat', () => {

  const carver: ItemConfig = {
    name: 'Level 1 Carver',
    parts: [],
    interaction: { name: Interaction.Carves, level: 1 }
  };

  const meat: ItemConfig = {
    name: 'Level 2 Meat',
    parts: [
      {
        name: 'Haunch',
        descriptors: {
          [Descriptor.Meat]: { level: 2 }
        }
      },
      {
        name: 'Blood',
        descriptors: {
          [Descriptor.Bloody]: { level: 2 }
        }
      }
    ]
  };

  const result = getReaction(Interaction.Carves, Descriptor.Meat)({
    sourceAction: Interaction.Carves,
    sourceItem: carver,
    targetItem: meat
  });

  expect(result.success).toBe(true);
  expect(result.newSource).toEqual(undefined);
  expect(result.newTarget.parts.length).toBe(2);
  expect(getDescriptorLevel(result.newTarget, Descriptor.Meat)).toEqual(1);
  expect(getDescriptorLevel(result.newTarget, Descriptor.Bloody)).toEqual(3);

});
