export const CMHV = {};

/**
 * The set of build Scores used within the sytem.
 * @type {Object}
 */
CMHV.build = {
  "body": "CMHV.AttributeBody",
  "mind": "CMHV.AttributeMind",
  "skill": "CMHV.AttributeSkill",
  "will": "CMHV.AttributeWill"
};

CMHV.itemType = {
  "weapon": "CMHV.Weapon",
  "item": "CMHV.Item",
  "spell": "CMHV.Spell",
  "knowledge": "CMHV.Knowledge"
}

CMHV.damageType = {
  "blunt": "CMHV.DamageBlunt",
  "pierce": "CMHV.DamagePierce",
  "slash": "CMHV.DamageSlash"
}

CMHV.spellCircle = {
  'Light' : "CMHV.SpellCircleLight",
  'Darkness' : "CMHV.SpellCircleDarkness",
  'Destruction' : "CMHV.SpellCircleDestruction",
  'Invocation' : "CMHV.SpellCircleInvocation"
}

CMHV.spellDomain = {
  'Bless': "CMHV.SpellDomainBless",
  'Abjuration': "CMHV.SpellDomainAbjuration",
  'Wrath': "CMHV.SpellDomainWrath",
  "Hex": "CMHV.SpellDomainHex",
  "Mind": "CMHV.SpellDomainMind",
  "Pain": "CMHV.SpellDomainPain",
  "Fire": "CMHV.SpellDomainFire",
  "Ice": "CMHV.SpellDomainIce",
  "Storm": "CMHV.SpellDomainStorm",
  "Life": "CMHV.SpellDomainLife",
  "Earth": "CMHV.SpellDomainEarth",
  "Elemental": "CMHV.SpellDomainElemental"
}

CMHV.rangeType = {
  'melee' : "CMHV.Melee",
  'ranged' : "CMHV.Ranged"
}