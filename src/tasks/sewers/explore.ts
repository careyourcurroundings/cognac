
import { Macro, $effect, $familiar, $skill, $location, $item, have } from "libram"
import { visitUrl } from "kolmafia";
import { CombatStrategy, Task } from "grimoire-kolmafia"

const tryFreeRunThenAttack = Macro
    .trySkill($skill`Bowl a Curveball`)
    .trySkill($skill`Asdon Martin: Spring-Loaded Front Bumper`)
    .attack();


let complete = false;

export const ExploreTasks: Task[] = [
    {
        name: "Explore sewer",
        completed: () => false,
        do: () => $location`A Maze of Sewer Tunnels`,
        effects: [
            $effect`Sonata of Sneakiness`,
            $effect`smooth movement`
        ],
        combat: new CombatStrategy().macro(tryFreeRunThenAttack),
        outfit: {
            equip: [
                $item`gatorskin umbrella`,
                $item`hobo code binder`,
            ],
            modifier: "-combat",
            familiar: [
                $familiar`Frumious Bandersnatch`,
                $familiar`Pair of Stomping Boots`,
                $familiar`disgeist`,
            ].find(have)
        },
        choices: {
            197: 1,
            198: 1,
            199: 1
        }
    }
]