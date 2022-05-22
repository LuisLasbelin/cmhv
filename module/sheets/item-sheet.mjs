import {CMHV} from "../helpers/config.mjs";

/**
 * Extend the basic ItemSheet with some very simple modifications
 * @extends {ItemSheet}
 */
export class CmhvItemSheet extends ItemSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["cmhv", "sheet", "item"],
      width: 520,
      height: 480,
      tabs: [{
        navSelector: ".sheet-tabs",
        contentSelector: ".sheet-body",
        initial: "description"
      }]
    });
  }

  /** @override */
  get template() {
    const path = "systems/cmhv/templates/item";
    // Return a single sheet for all item types.
    // return `${path}/item-sheet.hbs`;

    // Alternatively, you could use the following return statement to do a
    // unique item sheet by type, like `weapon-sheet.hbs`.
    return `${path}/item-${this.item.data.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    // Retrieve base data structure.
    const context = super.getData();

    // Use a safe clone of the item data for further operations.
    const itemData = context.item.data;

    // Retrieve the roll data for TinyMCE editors.
    context.rollData = {};
    let actor = this.object ?.parent ?? null;
    if (actor) {
      context.rollData = actor.getRollData();
    }

    // Add the actor's data to context.data for easier access, as well as flags.
    context.data = itemData.data;
    context.flags = itemData.flags;
    context.config = CMHV;

    this._prepareItems(context);

    return context;
  }


  /**
   * Add item data to show.
   *
   * @param {Object} actorData The actor to prepare.
   *
   * @return {undefined}
   */
  _prepareItems(context) {
    // Prepare item data.

    console.log(context.item.data.type)
    if(context.item.data.type === "spell") {
      const spellCircles = {
        "Light" : {
          name: context.config.spellCircle["Light"],
          domains: {
            "Bless": context.config.spellDomain["Bless"],
            "Abjuration": context.config.spellDomain["Abjuration"],
            "Wrath": context.config.spellDomain["Wrath"]
          }
        },
        "Darkness" : {
          name: context.config.spellCircle["Darkness"],
          domains: {
            "Hex": context.config.spellDomain["Hex"],
            "Mind": context.config.spellDomain["Mind"],
            "Pain": context.config.spellDomain["Pain"]
          }
        },
        "Destruction" : {
          name: context.config.spellCircle["Destruction"],
          domains: {
            "Ice": context.config.spellDomain["Ice"],
            "Fire": context.config.spellDomain["Fire"],
            "Storm": context.config.spellDomain["Storm"]
          }
        },
        "Invocation" : {
          name: context.config.spellCircle["Invocation"],
          domains: {
            "Life": context.config.spellDomain["Life"],
            "Earth": context.config.spellDomain["Earth"],
            "Elemental": context.config.spellDomain["Elemental"]
          }
        }
      } // json end

      context.spellDomains = spellCircles[context.item.data.data.spellCircle].domains;

      // Adds data to the .hbs to use
      context.spellCircles = spellCircles;      
    } // spell end

    if(context.item.data.type === "weapon") {
      const damageTypes = {
        "blunt": context.config.damageType["blunt"],
        "pierce": context.config.damageType["pierce"],
        "slash": context.config.damageType["slash"],
        "fire": context.config.damageType["fire"],
        "cold": context.config.damageType["cold"],
        "electricity": context.config.damageType["electricity"],
        "acid": context.config.damageType["acid"],
        "poison": context.config.damageType["poison"],
        "sonic": context.config.damageType["sonic"],
        "psychic": context.config.damageType["psychic"],
        "holy": context.config.damageType["holy"],
        "dark": context.config.damageType["dark"],
        "necrotic": context.config.damageType["necrotic"],
      }

      context.damageTypes = damageTypes;
    }

    if(context.item.data.type === "armor") {
      const armorTypes = {
        "light": context.config.armorType["light"],
        "medium": context.config.armorType["medium"],
        "heavy": context.config.armorType["heavy"],
        "shield": context.config.armorType["shield"]
      }

      context.armorTypes = armorTypes;
    }

  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(hbs) {
    super.activateListeners(hbs);

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Roll handlers, click handlers, etc. would go here.
  }
}