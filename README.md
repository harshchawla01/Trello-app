This is a Trello clone. It is an ultimate tool for getting things done. Whether you're managing daily to-dos, setting personal goals, or organizing your life, Trello helps you focus on what matters most and always stay on top of your game. (Language used: Js)
It is made with react, react redux, tailwindcss, react router dom, firebase, string hash, react icons, dnd kit.

User can make several boards. A board will itself pick a colour from a defined set of colors via string-hash algo which is applied on the board id.
User can make multiple lists in a board such as TODO, DOING and DONE and you can move your cards from one list to another with time by dragging the card by holding it from from the position where its title is written and drop it to another list (via dnd-kit).
User can edit or delete the card and its description by clicking on it.
Lists and Boards can be edited or deleted by clicking on the ellipsis.

Cards and Boards are sorted by descending order of last modified date. (Newest first)
Lists are sorted by ascending order of last modified date. (Addition order)

Updated cards are shifted to the top of the list.
