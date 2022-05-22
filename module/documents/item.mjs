import {CMHV} from "../helpers/config.mjs"

/**
 * Extend the basic Item with some very simple modifications.
 * @extends {Item}
 */
export class CmhvItem extends Item {
  chatTemplate = {
    "weapon": "systems/cmhv/templates/chat/chat-weapon.hbs",
    "spell": "systems/cmhv/templates/chat/chat-spell.hbs",
    "item": "systems/cmhv/templates/chat/chat-item.hbs",
    "knowledge": "systems/cmhv/templates/chat/chat-knowledge.hbs",
    "feature": "systems/cmhv/templates/chat/chat-feature.hbs"

  };

  /**
   * Augment the basic Item data model with additional dynamic data.
   */
  prepareData() {
    // As with the actor class, items are documents that can have their data
    // preparation methods overridden (such as prepareBaseData()).
    super.prepareData();
  }

  /**
   * Prepare a data object which is passed to any Roll formulas which are created related to this Item
   * @private
   */
   getRollData() {
    // If present, return the actor's roll data.
    if ( !this.actor ) return null;
    const rollData = this.actor.getRollData();
    rollData.item = foundry.utils.deepClone(this.data.data);

    return rollData;
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  async roll() {

    const item = this.data;

    // Initialize chat data.
    const rollMode = game.settings.get('core', 'rollMode');
    
    let chatData = {
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
      rollMode: rollMode,
      actor: this.actor,
      item: this,
      description: item.data.description ?? ''
    };

    // WEAPON
    if (item.data.isWeapon) {
      
      // necessary translations
      let skill = game.i18n.localize("CMHV.AttributeSkill");
      let body = game.i18n.localize("CMHV.AttributeBody"); 

      // Retrieve roll data.
      const rollData = this.getRollData();
      // Invoke the roll and submit it to chat.
      const rollPrecission = new Roll("d20+" + this.actor.getRollData().build.skill.value+ "+" + item.data.precission.value, rollData);
      chatData.rollPrecissionFormula = `d20 + ${skill} + Precission`;
      // Damage rolls
      let rollDamage = {};
      // Ranged damage
      if(item.data.range.type === "ranged") {
        rollDamage = new Roll(item.data.damage.value + "+" + this.actor.getRollData().build.body.value + "/2", rollData);
        chatData.rollDamageJson = rollDamage.toJSON();
        chatData.rollDamageFormula = `${chatData.rollDamageJson.terms[0].number}d${chatData.rollDamageJson.terms[0].faces} + ${body}/2`;
      }
      // Melee damage
      else {
        rollDamage = new Roll(item.data.damage.value + "+" + this.actor.getRollData().build.body.value, rollData);
        chatData.rollDamageJson = rollDamage.toJSON();
        chatData.rollDamageFormula = `${chatData.rollDamageJson.terms[0].number}d${chatData.rollDamageJson.terms[0].faces} + ${body}`;
      }

      // If you need to store the value first, uncomment the next line.
      // let result = await roll.roll({async: true});
      chatData.rollPrecission = await rollPrecission.roll({ async: true });
      chatData.rollDamage = await rollDamage.roll({ async: true });

      // Translated range
      chatData.rangeType = CMHV.rangeType[item.data.range.type];
      if(item.data.range.type === "ranged"){
        chatData.rangeValue = item.data.range.value + "m";
      }

      // Translated damage type
      chatData.damageType = CMHV.damageType[item.data.damageType];

      chatData.content = await renderTemplate(this.chatTemplate["weapon"], chatData);

      // Play rolling sound
      AudioHelper.play({src: 'sounds/dice.wav', volume: 0.8, loop: false}, true);

      return ChatMessage.create(chatData);
    }
    // SPELL
    if(item.type == "spell") {
      
      // Retrieve roll data.
      const rollData = this.getRollData();
      // Invoke the roll and submit it to chat.
      const rollPrecission = new Roll("d20+" + this.actor.getRollData().build.will.value, rollData);
      const rollDamage = new Roll(item.data.spellDamage + "+" + this.actor.getRollData().build.will.value, rollData);

      chatData.rollDamageJson = rollDamage.toJSON();

      chatData.precissionObjective = 5 + Number.parseInt(item.data.spellLevel);

      // Translated spell circle
      chatData.spellCircle = CMHV.spellCircle[item.data.spellCircle];

      // Translated damage type
      chatData.damageType = CMHV.damageType[item.data.damageType];

      // If you need to store the value first, uncomment the next line.
      // let result = await roll.roll({async: true});
      chatData.rollPrecission = await rollPrecission.roll({ async: true });
      chatData.rollDamage = await rollDamage.roll({ async: true });

      chatData.level = item.data.spellLevel;

      chatData.content = await renderTemplate(this.chatTemplate["spell"], chatData);

      // Play rolling sound
      AudioHelper.play({src: 'sounds/dice.wav', volume: 0.8, loop: false}, true);

      return ChatMessage.create(chatData);
    }
    if(item.type === "knowledge") {

      chatData.level = item.data.knowledgeLevel;

      chatData.content = await renderTemplate(this.chatTemplate["knowledge"], chatData);

      // Play rolling sound
      AudioHelper.play({src: 'sounds/lock.wav', volume: 0.8, loop: false}, true);

      return ChatMessage.create(chatData);
    }
    if(item.type === "feature") {

      chatData.content = await renderTemplate(this.chatTemplate["feature"], chatData);

      // Play rolling sound
      AudioHelper.play({src: 'sounds/lock.wav', volume: 0.8, loop: false}, true);

      return ChatMessage.create(chatData);
    }
    // COMMON ITEM
    chatData.value = item.data.value;
    chatData.weight = item.data.weight;
    chatData.quantity = item.data.quantity;

    chatData.content = await renderTemplate(this.chatTemplate["item"], chatData);

    // Play rolling sound
    AudioHelper.play({src: 'sounds/lock.wav', volume: 0.8, loop: false}, true);

    return ChatMessage.create(chatData);
  }
}
