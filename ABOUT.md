Game States:
1    WELCOME: The introduction message.
2    FLAT: Symbol("flat"),
3    TRAP: Symbol("conk"),
4    DOOR: Symbol("door"),
5    MANSION: Symbol("mansion"),
6    EXIT: Symbol("exit"),
7    HALL: Symbol("hall"),
8    PATH1: Symbol("path1"),
9    SPHYNX: Symbol("sphynx"),
10   RIDDLE: Symbol("riddle"),
11   PYRAMID: Symbol("pyramid"),
12   MUMMY: Symbol("mummy"),
13   LOOT: Symbol("loot"),
14   AMULET: Symbol("amulet"),
15   SEWER: Symbol("sewer"),
16   TOMB: Symbol("tomb"),
17   PATH2: Symbol("path2"),
18   BRIDGE: Symbol("bridge"),
19   DIZZY: Symbol("dizzy"),
20   SWITCH: Symbol("switch"),
21   DOORBELL: Symbol("doorbell"),
22   RED: Symbol("red"),
23   SHELF: Symbol("shelf"),
24   BLUE: Symbol("blue"),
25   WORD: Symbol("word"),
26   GOBLIN: Symbol("goblin"),
27   MUTANT: Symbol("mutant"),
28   FIGHT: Symbol("fight"),
29   HERO: Symbol("hero"),
30   ATTACK: Symbol("attack"),
31   WIN: Symbol("win"),
32   END: Symbol("end")

-----------------------------------------

Walkthrough:
            Welcome 
            Flat Tire
    Wait*               Knock
    K.O.                Foyer
    ----                Gas
            Dungeon*
            Exit
            Hallway
    Idol                        Hit*
Sphynx  Mummy                   Bridge
Riddle  Loot            Goblin          Dizzy*
Pyramid Amulet*     Fight   Hero        Mutant
        Sewer       Mutant  Attack
        Tomb                Win

-----------------------------------------

Alternate states:
1    -If you went to WAIT then you can visit an alternate state of DIZZY. That alternate state allows you to press a switch.
2    -If you press the switch in DIZZY then you open an alternate path in DUNGEON during your next playthrough:
                        Dungeon*
                        Switch
                        Doorbell
                    Red         Blue
                    Shelf       Word*
                    Escape      
3    -If you follow the right path in AMULET then you learn a secret word to use in WORD. This word gives you an alternate ending. 
4    -If you SKIP to the end of the book in RED then you will miss a clue for the SHELF state.
5    -If you choose not to hit the stranger in HIT then during your next playthrough WAIT will have an alternate ending. 
     -If you choose to hit the stranger in HIT after you were hit in WAIT then you will get an alternate ending.

-----------------------------------------

Endings:
1    -RIDDLE: give the wrong answer.
2    -PYRAMID: Choose to escape.
3    -PYRAMID: Don't choose to escape.
4    -MUMMY: Run from the mummy.
5    -LOOT: Run instead of looting the mummy.
6    -SEWER: Choose to leave.
7    -TOMB: Become a mummy.
8    -TOMB: Choose to leave.
9    -PATH2: If you hit the stranger after being hit in WAIT, then you die.
10   -FIGHT: Jab at the goblin.
11   -ATTACK: Let the stranger jab you.
12   -WIN: Bite the stranger.
13   -WIN: Throw the stranger.
14   -SHELF: Houdini escape.
15   -SHELF: Trapdoor ending.
16   -BLUE: Sit in the spider's chair.
17   -WORD: Don't enter the magic word.
18   -WORD: Enter the magic word found by wearing the AMULET.
19   -WAIT: Wait for help after choosing not to HIT the stranger in prior playthrough.


Total: 56 states