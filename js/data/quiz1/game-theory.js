(function () {
  const R = String.raw;
  window.SUBJECTS.push({
    exam: 'quiz1',
    id: 'game-theory',
    name: 'Game Theory and Strategy',
    short: 'Game Theory',
    level: 'Degree level',
    color: '#7a4fd6',
    blurb: 'Normal-form games, dominance, Nash equilibrium in pure and mixed strategies, continuous games, and extensive-form games with subgame perfection.',
    chips: ['Nash equilibrium', 'IESDS', 'Mixed strategies', 'Extensive form', 'SPE'],
    papers: 'Quiz 1 papers from Jul 2024, Oct 2024, Jul 2025, Oct 2025 and Jul 2026. The same five or six comprehension sets repeat across sessions with changed numbers.',

    pattern: {
      facts: [
        { k: 'Total marks', v: '20 – 25' },
        { k: 'Format', v: 'Comprehension sets' },
        { k: 'Question types', v: 'MCQ + numeric' },
        { k: 'Repeat rate', v: 'Very high' }
      ],
      rows: [
        { topic: 'Extensive-form game (A/B, C/D, E/F)', how: R`Eight 1-mark sub-questions every session: perfect information?, terminal nodes, information sets, pure strategies of each player, number of pure NE, which NE is subgame perfect, number of subgames.`, weight: 'high' },
        { topic: 'Mixed-strategy NE (police vs drug dealer)', how: R`2×2 game with no pure NE. Find each player's randomisation probability as a fraction ($p/q$, or $p/13$).`, weight: 'high' },
        { topic: 'Auction as a matrix game', how: R`Two bidders, values like 3 and 5, bids $\{0,1,2\}$, coin toss on ties. Build the 3×3 matrix, find strictly dominated strategies and what survives IESDS.`, weight: 'high' },
        { topic: 'Choosing a route (Braess paradox)', how: R`Four drivers, two routes, travel time grows with cars. Find the NE split and travel times, then again after a new X–Y road is added.`, weight: 'high' },
        { topic: 'Price / effort game with continuous actions', how: R`Duopoly choosing prices (or partners choosing effort). Derive the best-response function $BR_i(P_j)$, find the symmetric NE and equilibrium payoff.`, weight: 'medium' },
        { topic: 'Given normal-form matrix', how: R`Does it have a unique pure NE, a mixed NE, or both? Followed by a numeric answer (a probability or expected payoff).`, weight: 'medium' }
      ]
    },

    tips: [
      R`For the extensive-form set, write the strategic form first. Player 1 has <strong>4</strong> strategies (AE, AF, BE, BF) because a strategy must say what to do at every information set, even ones that strategy itself makes unreachable.`,
      R`In mixed-strategy questions, each player's probability is found from the <em>other</em> player's indifference. The officer's mix comes from the dealer's payoffs, and vice versa.`,
      R`For auction matrices, a tie gives each bidder half the surplus: $\tfrac12(v_i - b)$. Fill all nine cells before checking dominance.`,
      R`"Unique NE in pure strategy" and "unique NE" are different claims. A game with no pure NE still has a mixed one (Nash's theorem), so "no Nash equilibrium" is wrong for any finite game.`,
      R`Check a proposed NE by testing one-player deviations only. You never need to check two players moving together.`
    ],

    topics: [
      {
        title: 'Strategic (normal-form) games',
        weight: 'high',
        html: R`
<p>A strategic game has three ingredients: a set of <strong>players</strong>, a set of <strong>actions</strong> (strategies) for each player, and a <strong>payoff</strong> for each player at every action profile. Players choose simultaneously, or equivalently without observing each other.</p>
<p>A two-player game is written as a matrix. Player 1 picks a row, player 2 a column. Each cell is (payoff to 1, payoff to 2).</p>
<table><tr><th></th><th>L</th><th>R</th></tr><tr><th>U</th><td>3, 3</td><td>0, 5</td></tr><tr><th>D</th><td>5, 0</td><td>1, 1</td></tr></table>
<p>A game is <strong>symmetric</strong> if both players have the same action set and swapping roles swaps payoffs: $u_1(a,b)=u_2(b,a)$. A symmetric game always has a symmetric equilibrium (possibly mixed), but it can also have asymmetric ones.</p>
<p><strong>Modelling a story as a game</strong> (asked in every paper): list who decides, what each can choose, and compute the payoff in each cell from the story's rules.</p>`
      },
      {
        title: 'Dominance and IESDS',
        weight: 'high',
        html: R`
<ul>
<li>Strategy $s$ <strong>strictly dominates</strong> $s'$ if $s$ gives a strictly higher payoff than $s'$ against <em>every</em> opponent action.</li>
<li>$s$ <strong>weakly dominates</strong> $s'$ if it is never worse and strictly better at least once.</li>
<li>A <strong>dominant strategy</strong> dominates all of the player's other strategies.</li>
</ul>
<p><strong>IESDS</strong> (iterated elimination of strictly dominated strategies): delete a strictly dominated strategy, look at the smaller game, repeat until nothing more can be deleted.</p>
<ul>
<li>The order of deletion does not matter for strict dominance.</li>
<li>Every Nash equilibrium survives IESDS. If only one profile survives, it is the unique NE.</li>
<li>A strategy can also be strictly dominated by a <em>mixture</em> of two other strategies even if no single pure strategy dominates it.</li>
</ul>
<p class="trap">Weak dominance is not enough for IESDS. One equal payoff in any column (or row) means the strategy is only weakly dominated and stays.</p>`
      },
      {
        title: 'Best response and pure-strategy Nash equilibrium',
        weight: 'high',
        html: R`
<p>Player $i$'s <strong>best response</strong> to $a_{-i}$ is any action that maximises $u_i(\cdot, a_{-i})$. A profile $a^*$ is a <strong>Nash equilibrium</strong> if every player is best-responding to the others:</p>
$$u_i(a_i^*, a_{-i}^*) \ge u_i(a_i, a_{-i}^*) \quad \text{for every player } i \text{ and every } a_i.$$
<h3>Finding pure NE in a matrix (underline method)</h3>
<ol>
<li>In each column, underline player 1's highest payoff.</li>
<li>In each row, underline player 2's highest payoff.</li>
<li>Any cell with both numbers underlined is a pure NE.</li>
</ol>
<p>In the matrix above, D is best for player 1 in both columns and R is best for player 2 in both rows, so (D, R) is the only NE, even though (U, L) gives both more. That is the Prisoner's Dilemma.</p>
<ul>
<li>A game can have zero, one, or many pure NE.</li>
<li>A strictly dominated strategy is never played in an NE. A weakly dominated one can be.</li>
<li>NE need not be efficient.</li>
</ul>`
      },
      {
        title: 'Mixed strategies and the indifference principle',
        weight: 'high',
        html: R`
<p>A <strong>mixed strategy</strong> is a probability distribution over pure strategies. Payoffs become expected payoffs. <strong>Nash's theorem</strong>: every finite game has at least one NE, possibly in mixed strategies.</p>
<p class="key"><strong>Indifference principle.</strong> If a player mixes between two actions in equilibrium, both must give the same expected payoff. So you find player 1's probability from player 2's payoffs, and player 2's probability from player 1's payoffs.</p>
<p>For a 2×2 game with payoffs $(a_{ij}, b_{ij})$, where player 1 plays the top row with probability $p$ and player 2 plays the left column with probability $q$:</p>
$$p = \frac{b_{22}-b_{21}}{b_{11}-b_{12}-b_{21}+b_{22}}, \qquad q = \frac{a_{22}-a_{12}}{a_{11}-a_{12}-a_{21}+a_{22}}$$
<p>Do not memorise this blindly. In the exam, write the two expected payoffs and equate them.</p>
<ul>
<li>Games like matching pennies or police-vs-dealer (one wants to match, the other to mismatch) have <strong>no pure NE</strong> and exactly one mixed NE.</li>
<li>Coordination games such as Battle of the Sexes have two pure NE plus one mixed NE: three in total.</li>
<li>Generic finite games have an odd number of equilibria.</li>
</ul>`
      },
      {
        title: 'Games with continuous actions (price, quantity, effort)',
        weight: 'medium',
        html: R`
<p>When the action is a number (a price, a quantity, an effort level), use calculus:</p>
<ol>
<li>Write player $i$'s payoff $u_i(x_i, x_j)$.</li>
<li>Set $\partial u_i / \partial x_i = 0$ and solve for $x_i$. This is the <strong>best-response function</strong> $BR_i(x_j)$.</li>
<li>The NE is where the best-response functions cross: solve $x_1 = BR_1(x_2)$ and $x_2 = BR_2(x_1)$ together.</li>
<li>In a symmetric game, look for a symmetric NE by setting $x_1 = x_2 = x$ in one best response.</li>
</ol>
<h3>Cournot (quantities)</h3>
<p>Inverse demand $P = a - (q_1+q_2)$, unit cost $c$. Then $BR_i(q_j) = \dfrac{a - c - q_j}{2}$, so $q^* = \dfrac{a-c}{3}$ each, price $\dfrac{a+2c}{3}$, profit $\dfrac{(a-c)^2}{9}$ each.</p>
<h3>Differentiated Bertrand (prices)</h3>
<p>If firm $i$ sells $q_i = a - p_i + b\,p_j$ at zero cost, profit is $p_i(a - p_i + b\,p_j)$ and $BR_i(p_j) = \dfrac{a + b\,p_j}{2}$. Best responses slope <em>upward</em>: prices are strategic complements.</p>
<h3>Homogeneous Bertrand</h3>
<p>Identical goods, the lower price takes the whole market: the unique NE is $p_1 = p_2 = c$, zero profit.</p>
<p class="trap">Always check the second-order condition mentally (the payoff should be concave in your own action) and that the answer is not negative.</p>`
      },
      {
        title: 'Congestion games and the Braess paradox',
        weight: 'high',
        html: R`
<p>In the route-choice set, each driver's cost on a road depends on how many cars use it. A profile is an NE when <strong>no single driver</strong> can cut their own time by switching routes, taking into account that they add one car to the new road.</p>
<h3>Method</h3>
<ol>
<li>Tabulate each road's time for 1, 2, 3, 4 cars.</li>
<li>Guess a split (symmetric splits first), compute each driver's time.</li>
<li>For each type of driver, compute the time after a unilateral switch. Remember the switcher increases the count on the new road.</li>
</ol>
<p><strong>Braess paradox:</strong> adding a new road can raise everyone's equilibrium travel time. With the PYQ numbers, the two-and-two split costs 29.9 or 30 minutes. After the X–Y link opens, the equilibrium has one driver on A–X–B, two on A–X–Y–B and one on A–Y–B, and everyone takes 32 minutes.</p>`
      },
      {
        title: 'Auctions as matrix games',
        weight: 'high',
        html: R`
<p>First-price auction with discrete bids. If $i$ bids $b_i$ and has value $v_i$:</p>
<ul>
<li>Win outright: payoff $v_i - b_i$.</li>
<li>Lose: payoff $0$.</li>
<li>Tie, coin toss: expected payoff $\tfrac12 (v_i - b_i)$.</li>
</ul>
<p>Build the full matrix, then apply dominance. A higher-value bidder tends to have low bids strictly dominated, because winning is worth more to them.</p>
<p>In a <strong>second-price</strong> auction (winner pays the other bid), bidding your true value is weakly dominant.</p>`
      },
      {
        title: 'Extensive-form games: trees, information sets, strategies',
        weight: 'high',
        html: R`
<p>An extensive-form game is a tree: <strong>decision nodes</strong> (each owned by a player), <strong>branches</strong> (actions) and <strong>terminal nodes</strong> (with payoffs).</p>
<ul>
<li>An <strong>information set</strong> groups the nodes a player cannot tell apart when moving. The same actions must be available at every node in the set.</li>
<li><strong>Perfect information</strong>: every information set contains exactly one node. Then the number of information sets equals the number of decision nodes.</li>
<li><strong>Imperfect information</strong>: at least one information set has more than one node (for example, simultaneous moves drawn as a tree).</li>
</ul>
<p class="key">A <strong>pure strategy</strong> is a complete plan: one action at <em>every</em> information set of that player. Number of pure strategies = product of the number of actions at each of the player's information sets.</p>
<p>To find all NE, convert to the strategic form (rows = player 1's strategies, columns = player 2's) and use the underline method.</p>`
      },
      {
        title: 'Subgames, backward induction and subgame-perfect equilibrium',
        weight: 'high',
        html: R`
<p>A <strong>subgame</strong> starts at a single decision node that is alone in its information set, contains all its successors, and does not cut any information set. The whole game counts as a subgame.</p>
<ul>
<li>In a perfect-information game, the number of subgames equals the number of decision nodes.</li>
<li>Simultaneous-move games drawn as trees have just one subgame (the whole game).</li>
</ul>
<p>A <strong>subgame-perfect equilibrium (SPE)</strong> is a strategy profile that is a Nash equilibrium in every subgame.</p>
<h3>Backward induction</h3>
<ol>
<li>Go to the last decision nodes. Pick the mover's best action at each.</li>
<li>Replace those nodes with the resulting payoffs and move one step up.</li>
<li>Repeat to the root. The chosen action at every node, including off-path nodes, is the SPE.</li>
</ol>
<p>Every SPE is an NE, but not every NE is an SPE. NE that are not SPE rely on <strong>non-credible threats</strong>: actions the player would not actually take if that node were reached.</p>
<p class="trap">Write the SPE as full strategies, such as (AF, D), not just the path of play.</p>`
      }
    ],

    formulas: [
      {
        group: 'Equilibrium conditions',
        items: [
          { name: 'Nash equilibrium', tex: R`u_i(a_i^*, a_{-i}^*) \ge u_i(a_i, a_{-i}^*) \quad \forall i,\ \forall a_i`, note: 'No player gains from a unilateral deviation.' },
          { name: 'Strict dominance', tex: R`u_i(s, a_{-i}) > u_i(s', a_{-i}) \quad \forall a_{-i}`, note: R`Then $s'$ is never played in any NE and is removed in IESDS.` },
          { name: 'Expected payoff', tex: R`E[u_i] = \sum_{a} \Pr(a)\, u_i(a)` }
        ]
      },
      {
        group: 'Mixed strategies in a 2×2 game',
        items: [
          { name: 'Row player mixes with p', tex: R`p\,b_{11} + (1-p)\,b_{21} = p\,b_{12} + (1-p)\,b_{22}`, note: R`Makes the <em>column</em> player indifferent. $p$ = probability of the top row.` },
          { name: 'Solved for p', tex: R`p = \frac{b_{22}-b_{21}}{b_{11}-b_{12}-b_{21}+b_{22}}` },
          { name: 'Column player mixes with q', tex: R`q = \frac{a_{22}-a_{12}}{a_{11}-a_{12}-a_{21}+a_{22}}`, note: R`Makes the <em>row</em> player indifferent. $q$ = probability of the left column.` }
        ]
      },
      {
        group: 'Continuous games',
        items: [
          { name: 'Best-response function', tex: R`\frac{\partial u_i(x_i, x_j)}{\partial x_i} = 0 \;\Rightarrow\; x_i = BR_i(x_j)` },
          { name: 'Cournot best response', tex: R`BR_i(q_j) = \frac{a - c - q_j}{2}`, note: R`Demand $P = a - Q$, unit cost $c$.` },
          { name: 'Cournot NE (2 firms)', tex: R`q^* = \frac{a-c}{3}, \quad P^* = \frac{a+2c}{3}, \quad \pi^* = \frac{(a-c)^2}{9}` },
          { name: 'Cournot NE (n firms)', tex: R`q^* = \frac{a-c}{n+1}` },
          { name: 'Differentiated Bertrand', tex: R`q_i = a - p_i + b\,p_j \;\Rightarrow\; BR_i(p_j) = \frac{a + b\,p_j}{2}, \quad p^* = \frac{a}{2-b}`, note: 'Zero cost. Best responses slope upward.' }
        ]
      },
      {
        group: 'Auctions',
        items: [
          { name: 'First-price payoff', tex: R`u_i = \begin{cases} v_i - b_i & b_i > b_j \\ \tfrac12 (v_i - b_i) & b_i = b_j \\ 0 & b_i < b_j \end{cases}` }
        ]
      },
      {
        group: 'Extensive form',
        items: [
          { name: 'Pure strategies of a player', tex: R`\#\text{strategies} = \prod_{h \in H_i} \#\text{actions at } h`, note: R`$H_i$ = the player's information sets.` },
          { name: 'Subgames (perfect information)', tex: R`\#\text{subgames} = \#\text{decision nodes}`, note: 'Includes the whole game.' },
          { name: 'Relationship', tex: R`\text{SPE} \subseteq \text{NE}` }
        ]
      }
    ],

    examples: [
      {
        tag: 'Extensive form · asked every session',
        q: R`<p>Player 1 chooses A or B. A ends the game with payoffs (2, 0). After B, player 2 chooses C or D. C ends the game with (3, 1). After D, player 1 chooses E, giving (0, 0), or F, giving (1, 2).</p><p>Find: type of information, terminal nodes, information sets, pure strategies of each player, pure NE, the SPE, and the number of subgames.</p>`,
        a: R`
<p><strong>Structure.</strong> Every mover knows what happened before, so it is a game of <strong>perfect information</strong>. Terminal nodes: after A, C, E, F, so <strong>4</strong>. Decision nodes: P1 at the root, P2 after B, P1 after D, so <strong>3 information sets</strong> and <strong>3 subgames</strong>.</p>
<p><strong>Strategies.</strong> P1 has two information sets with two actions each: $2 \times 2 = 4$ strategies (AE, AF, BE, BF). P2 has <strong>2</strong> (C, D).</p>
<p><strong>Strategic form.</strong></p>
<table><tr><th></th><th>C</th><th>D</th></tr><tr><th>AE</th><td>2, 0</td><td>2, 0</td></tr><tr><th>AF</th><td>2, 0</td><td>2, 0</td></tr><tr><th>BE</th><td>3, 1</td><td>0, 0</td></tr><tr><th>BF</th><td>3, 1</td><td>1, 2</td></tr></table>
<p><strong>Pure NE.</strong> Against C, P1's best is BE or BF (3). Against D, P1's best is AE or AF (2). P2 is indifferent in the A rows, prefers C against BE, prefers D against BF. Mutual best responses: <strong>(AE, D), (AF, D), (BE, C)</strong>, so 3 pure NE.</p>
<p><strong>Backward induction.</strong> At the last node P1 picks F (1 &gt; 0). Knowing that, P2 compares C → 1 with D → 2 and picks D. Knowing that, P1 compares A → 2 with B → 1 and picks A.</p>
<p><strong>SPE = (AF, D)</strong>, outcome (2, 0). (AE, D) is an NE but not subgame perfect because E is not optimal at the last node. (BE, C) relies on the non-credible threat of E.</p>
<p>If the paper changes the payoffs (for example C → (3, 2), E → (2, 1)), redo the backward induction. The counts of nodes, information sets, strategies and subgames stay the same.</p>`
      },
      {
        tag: 'Mixed strategy · police vs dealer',
        q: R`<p>An officer and a dealer each choose Street or Park. Payoffs (officer, dealer):</p>
<table><tr><th></th><th>Dealer: Street</th><th>Dealer: Park</th></tr><tr><th>Officer: Street</th><td>80, 20</td><td>10, 90</td></tr><tr><th>Officer: Park</th><td>0, 100</td><td>60, 40</td></tr></table>
<p>Find all Nash equilibria.</p>`,
        a: R`
<p><strong>Pure NE.</strong> Officer's best responses: Street against Street (80), Park against Park (60). Dealer's best responses: Park against officer-Street (90), Street against officer-Park (100). No cell is a mutual best response, so there is <strong>no pure NE</strong>.</p>
<p><strong>Officer's mix.</strong> Let the officer patrol Street with probability $p$. The dealer must be indifferent:</p>
$$20p + 100(1-p) = 90p + 40(1-p) \;\Rightarrow\; 60 = 130p \;\Rightarrow\; p = \tfrac{6}{13}$$
<p>So the officer patrols Street with probability 6/13 and Park with 7/13.</p>
<p><strong>Dealer's mix.</strong> Let the dealer choose Street with probability $q$. The officer must be indifferent:</p>
$$80q + 10(1-q) = 0\cdot q + 60(1-q) \;\Rightarrow\; 130q = 50 \;\Rightarrow\; q = \tfrac{5}{13}$$
<p>The game has a <strong>unique NE</strong>, in mixed strategies. "No NE in pure strategy" and "unique NE in this game" are both true statements.</p>`
      },
      {
        tag: 'Auction matrix · IESDS',
        q: R`<p>Player 1 values an item at 3, player 2 at 5. Each bids 0, 1 or 2. The higher bid wins and pays its bid. Ties are settled by a coin toss. Which strategies are strictly dominated, and what survives IESDS?</p>`,
        a: R`
<p>Win: $v - b$. Tie: $\tfrac12(v-b)$. Lose: 0.</p>
<table><tr><th>P1 \ P2</th><th>0</th><th>1</th><th>2</th></tr><tr><th>0</th><td>1.5, 2.5</td><td>0, 4</td><td>0, 3</td></tr><tr><th>1</th><td>2, 0</td><td>1, 2</td><td>0, 3</td></tr><tr><th>2</th><td>1, 0</td><td>1, 0</td><td>0.5, 1.5</td></tr></table>
<p><strong>Round 1.</strong> For P2, bid 2 gives (3, 3, 1.5) against P1's bids 0, 1, 2, while bid 0 gives (2.5, 0, 0). Bid 2 strictly dominates bid 0. For P1, no pure strategy strictly dominates another: bid 1 beats bid 0 only weakly (both give 0 against a bid of 2). So with pure-strategy dominance, <strong>Player 1 has no strictly dominated strategy</strong>.</p>
<p><strong>Round 2.</strong> With P2's bid 0 gone, P1's bid 0 gives (0, 0) and bid 2 gives (1, 0.5). Bid 0 is now strictly dominated.</p>
<p><strong>Round 3.</strong> P2 compares bid 1, giving (2, 0), with bid 2, giving (3, 1.5), against P1's bids 1 and 2. Bid 1 is strictly dominated.</p>
<p><strong>Round 4.</strong> Against bid 2, P1 gets 0 from bidding 1 and 0.5 from bidding 2.</p>
<p><strong>(2, 2)</strong> is the only profile that survives, and it is the unique NE.</p>`
      },
      {
        tag: 'Route choice · Braess paradox',
        q: R`<p>Four drivers go from A to B via X or via Y. A–X and Y–B: 6 minutes for one car, +3 per extra car. A–Y: 20 minutes, +1 per extra car. X–B: 20 minutes, +0.9 per extra car. Find the NE. Then a road X–Y opens (7 minutes, +1 per extra car). Find the new NE.</p>`,
        a: R`
<p><strong>Before.</strong> Try two drivers on each route. A–X–B: $9 + 20.9 = 29.9$. A–Y–B: $21 + 9 = 30$. If an A–X–B driver switches, A–Y has 3 cars (22) and Y–B has 3 cars (12): 34, worse. If an A–Y–B driver switches, they get $12 + 21.8 = 33.8$, worse. So two-and-two is the NE, with travel times of 29.9 and 30 minutes.</p>
<p><strong>After.</strong> Try one on A–X–B, two on A–X–Y–B, one on A–Y–B. A–X carries 3 cars (12), X–Y carries 2 (8), Y–B carries 3 (12), X–B and A–Y carry 1 each (20).</p>
<ul><li>A–X–B: $12 + 20 = 32$</li><li>A–X–Y–B: $12 + 8 + 12 = 32$</li><li>A–Y–B: $20 + 12 = 32$</li></ul>
<p>Deviations: A–X–B → A–X–Y–B costs $12 + 9 + 15 = 36$. A–X–Y–B → A–X–B costs $12 + 20.9 = 32.9$. A–X–Y–B → A–Y–B costs $21 + 12 = 33$. A–Y–B → A–X–Y–B costs $15 + 9 + 12 = 36$. No one gains, so this is an NE.</p>
<p>Everyone now takes 32 minutes instead of about 30. The new road made every driver worse off.</p>`
      },
      {
        tag: 'Continuous actions · price competition',
        q: R`<p>Two firms choose prices simultaneously. Firm $i$ sells $q_i = 10 - p_i + \tfrac12 p_j$ and has zero cost. Find the best-response functions, the NE prices and each firm's profit.</p>`,
        a: R`
<p>Profit: $\pi_i = p_i\,(10 - p_i + \tfrac12 p_j)$.</p>
<p>First-order condition: $10 - 2p_i + \tfrac12 p_j = 0$, so</p>
$$BR_i(p_j) = 5 + \frac{p_j}{4}$$
<p>The game is symmetric, so set $p_1 = p_2 = p$: $p = 5 + p/4 \Rightarrow p^* = \tfrac{20}{3} \approx 6.67$.</p>
<p>Quantity: $10 - \tfrac{20}{3} + \tfrac{10}{3} = \tfrac{20}{3}$. Profit: $\tfrac{20}{3}\cdot\tfrac{20}{3} = \tfrac{400}{9} \approx 44.4$ each.</p>
<p>The best responses are straight lines that cross once, so this symmetric NE is the unique NE.</p>`
      }
    ],

    quiz: [
      { q: R`In the game with payoffs (U,L) = (3,3), (U,R) = (0,5), (D,L) = (5,0), (D,R) = (1,1), the set of pure Nash equilibria is`, options: ['(U, L) only', '(D, R) only', '(U, L) and (D, R)', 'There is none'], answer: 1, why: R`D strictly dominates U and R strictly dominates L. (D, R) is the only mutual best response, even though (U, L) is better for both.` },
      { q: R`In an extensive-form game, a player has two information sets: one with 2 actions and one with 3 actions. How many pure strategies does this player have?`, options: ['5', '6', '3', '2'], answer: 1, why: R`A strategy picks one action at every information set: $2 \times 3 = 6$.` },
      { q: R`Zero-sum game. Row player's payoffs: (H,H) = 2, (H,T) = −1, (T,H) = −1, (T,T) = 1. In the mixed NE, the column player chooses H with probability`, options: ['1/2', '2/5', '3/5', '1/3'], answer: 1, why: R`The row player must be indifferent: $2q - (1-q) = -q + (1-q)$, so $3q - 1 = 1 - 2q$ and $q = 2/5$.` },
      { q: R`Cournot duopoly with inverse demand $P = 100 - Q$ and unit cost 10. Each firm's NE quantity is`, options: ['45', '30', '22.5', '15'], answer: 1, why: R`$q^* = (a - c)/3 = 90/3 = 30$.` },
      { q: R`Which statement is FALSE?`, options: ['Every subgame-perfect equilibrium is a Nash equilibrium.', 'A strictly dominated strategy is never played in a Nash equilibrium.', 'A weakly dominated strategy can never be part of a Nash equilibrium.', 'Every finite game has at least one Nash equilibrium, possibly mixed.'], answer: 2, why: R`Weakly dominated strategies can appear in an NE. Example: (U,L) = (1,1) and every other cell (0,0). D and R are weakly dominated, yet (D, R) is an NE because no one gains by deviating alone.` },
      { q: R`Two players move simultaneously in a 2×2 game drawn as a tree (player 2 has one information set containing two nodes). How many subgames does the game have?`, options: ['1', '2', '3', '4'], answer: 0, why: R`A subgame cannot start inside or cut an information set. Only the whole game qualifies.` },
      { q: R`Battle of the Sexes with payoffs (O,O) = (2,1), (F,F) = (1,2) and (0,0) otherwise. How many Nash equilibria are there in total?`, options: ['1', '2', '3', 'Infinitely many'], answer: 2, why: R`Two pure NE, (O,O) and (F,F), plus one mixed NE found from indifference.` },
      { q: R`A bidder values an item at 4 and bids 2 in a first-price auction. The other bidder also bids 2 and a fair coin picks the winner. The bidder's expected payoff is`, options: ['2', '1', '0', '4'], answer: 1, why: R`$\tfrac12 (4 - 2) = 1$.` },
      { q: R`In a perfect-information game tree with 5 decision nodes and 6 terminal nodes, the number of subgames is`, options: ['5', '6', '11', '1'], answer: 0, why: R`With perfect information every decision node starts a subgame, including the root.` },
      { q: R`Four drivers split two-and-two across two routes in equilibrium. A new connecting road is built. Which outcome is possible in the new equilibrium?`, options: ['Travel time must fall for everyone.', 'Travel time must stay the same.', 'Travel time can rise for everyone.', 'There can be no equilibrium.'], answer: 2, why: R`This is the Braess paradox: individually rational route choices can make every driver slower after capacity is added.` }
    ]
  });
})();
