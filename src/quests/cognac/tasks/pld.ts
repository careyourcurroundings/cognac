import { CombatStrategy, Task } from "grimoire-kolmafia";
import { print, wait } from "kolmafia";
<<<<<<< HEAD
import { $location, $skill, get } from "libram";

import { Macro } from "../../../lib/combat";
import { basicEffects, noncombatEffects } from "../../../lib/effects";
import { getDefaultEquipment } from "../../../lib/equipment";
import { noncombatFamiliar } from "../../../lib/familiar";
=======
import { $item, $location, $skill, get, $familiar } from "libram";

import { Macro } from "../../../lib/combat";
import { basicEffects, noncombatEffects } from "../../../lib/effects";
import { getEquipment } from "../../../lib/equipment";
import { runsOrNCFamiliar } from "../../../lib/familiar";
>>>>>>> banderboots
import { Gossip } from "../../../lib/gossip";
import { capNonCombat } from "../../../lib/preparenoncom";


export function getModString(): string {
  if(runsOrNCFamiliar() === $familiar`Frumious Bandersnatch` || runsOrNCFamiliar() === $familiar`Pair of Stomping Boots` )
  {
    return "-combat, 0.25 familiar weight"; // This way 1 free run counts for slightly more than a softcapped combat-rate modifier
  } else {
    return "-combat";
  }
}

export class PLD {
  gossip: Gossip;
  constructor(gossip: Gossip) {
    this.gossip = gossip;
  }

  getTasks(): Task[] {
    return [
      {
        name: "Delay until diving",
        completed: () => this.gossip.getWaitTime() === 0,
        do: () => {
          print("Waiting for next cognac round to begin");
          wait(this.gossip.getWaitTime());
        },
      },
      {
        name: "Increase stench",
        completed: () => this.gossip.readyToDive(),
        do: () => $location`The Purple Light District`,
        effects: [...basicEffects(), ...noncombatEffects()],
        combat: new CombatStrategy().autoattack(Macro.trySkill($skill`Extract`).tryFreeRun()),
        prepare: () => {
          capNonCombat();
        },
        outfit: () => ({
<<<<<<< HEAD
          equip: getDefaultEquipment(),
          modifier: "-combat",
          familiar: noncombatFamiliar(),
=======
          equip: getEquipment([
            $item`June cleaver`,
            $item`Greatest American Pants`,
            $item`mafia thumb ring`,
          ]),
          // Include familiar weight modifier if bander/boots is active, else just use -combat
          modifier: getModString(),
          familiar: runsOrNCFamiliar(),
>>>>>>> banderboots
        }),
        choices: {
          205: 2,
          219: 2,
          223: 1,
          224: 1,
          294: 2,
        },
        post: () => {
          if (get("lastEncounter") === "The Furtivity of My City") {
            this.gossip.incrementStench();
            print(`Stench level increased to ${this.gossip.stench}.`);
          }
        },
      },
    ];
  }
}
