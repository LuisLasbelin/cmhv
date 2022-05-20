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


    if(context.type = "spell"){
      const spellCircles = {
        "Light" : context.config.spellCircle["Light"],
        "Darkness" : context.config.spellCircle["Darkness"],
        "Destruction" : context.config.spellCircle["Destruction"],
        "Invocation" : context.config.spellCircle["Invocation"]
      }
      
      // Adds data to the .hbs to use
      context.spellCircles = spellCircles;      
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