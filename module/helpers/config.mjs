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

CMHV.rangeType = {
  'melee' : "CMHV.Melee",
  'ranged' : "CMHV.Ranged"
}