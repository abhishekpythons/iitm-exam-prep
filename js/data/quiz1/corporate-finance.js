(function () {
  const R = String.raw;
  window.SUBJECTS.push({
    exam: 'quiz1',
    id: 'corporate-finance',
    name: 'Corporate Finance',
    short: 'Corp Finance',
    level: 'Degree level',
    color: '#0f8a5f',
    blurb: 'Time value of money, annuities and perpetuities, NPV / IRR / payback, bonds and the yield curve, the Gordon growth model, and GDP, CPI and real interest rates.',
    chips: ['PV & FV', 'Annuity / EMI', 'NPV & IRR', 'Bonds & duration', 'Inflation'],
    papers: 'Quiz 1 papers from Oct 2024, Feb 2025, Oct 2025 and Mar 2026. The same question templates return each session with new numbers.',

    pattern: {
      facts: [
        { k: 'Total marks', v: '100' },
        { k: 'Questions', v: '25 × 4 marks' },
        { k: 'Format', v: 'All single-answer MCQ' },
        { k: 'Calculator', v: 'Needed for most' }
      ],
      rows: [
        { topic: 'Compounding and annualised return', how: R`Money triples in 12 years: find the rate. Antique bought for Rs 100 sold for Rs 50,000 after 40 years. Time to double. Continuous compounding $Pe^{rt}$. Two-year total return split into yearly returns.`, weight: 'high' },
        { topic: 'Annuity, perpetuity, EMI, SIP', how: R`PV of an annuity, PV of a (growing or delayed) perpetuity, EMI on a loan at a monthly rate, future value of yearly SIP or daily savings.`, weight: 'high' },
        { topic: 'NPV, IRR, payback, profitability index', how: R`Compare projects A/B/C by NPV, compute PI, find IRR of a two-cash-flow project, find the payback period, IRR definition.`, weight: 'high' },
        { topic: 'Bonds', how: R`Zero-coupon yield, maturity vs (simple) duration, % price change for a small rate change, forward rate from 1-year and 2-year rates, yield-curve shapes, rating agencies, bond vs stock.`, weight: 'high' },
        { topic: 'GDP deflator, CPI, inflation', how: R`Real GDP from nominal GDP and deflator, CPI from a basket, inflation between years, "nominal GDP rose, real unchanged".`, weight: 'high' },
        { topic: 'Real vs nominal interest', how: R`Fisher equation in exact form: $(1+i) = (1+r)(1+\pi)$.`, weight: 'medium' },
        { topic: 'Gordon growth model', how: R`Find the price, the implied growth rate, or decide whether a stock is over- or under-priced.`, weight: 'medium' },
        { topic: 'Intertemporal budget constraint', how: R`Slope $= -(1+r)$, maximum consumption today, back out the interest rate from the slope.`, weight: 'medium' },
        { topic: 'Securitisation / default probability', how: R`Senior and junior tranches from two bonds: default probabilities when bonds are independent or perfectly correlated.`, weight: 'low' }
      ]
    },

    tips: [
      R`Use the <strong>exact</strong> Fisher relation. Nominal 10% and inflation 4% give a real rate of $1.10/1.04 - 1 = 5.77\%$, not 6%. Both usually appear as options.`,
      R`"Beginning next year" means an ordinary annuity or perpetuity: the first payment is at $t = 1$, so the standard formulas apply directly.`,
      R`For EMI questions the rate given is already <em>monthly</em> and $n$ is the number of months. Do not divide by 12 again.`,
      R`Annualised return over $n$ years is a geometric average: $(\text{End}/\text{Start})^{1/n} - 1$. Never divide the total return by $n$.`,
      R`Gordon model verdict: compute the model value $D_1/(r-g)$. If market price is <em>above</em> it, the stock is overpriced (sell). If below, underpriced (buy).`,
      R`In this course "duration" in simple questions is the cash-flow-weighted average time, $\sum t\,C_t / \sum C_t$. Maturity is just the date of the last payment.`
    ],

    topics: [
      {
        title: 'Time value of money and compounding',
        weight: 'high',
        html: R`
<p>A rupee today is worth more than a rupee later because it can earn interest. Moving money forward is <strong>compounding</strong>, moving it back is <strong>discounting</strong>.</p>
$$FV = PV\,(1+r)^n \qquad PV = \frac{FV}{(1+r)^n}$$
<ul>
<li><strong>Compounding $m$ times a year:</strong> $FV = PV\,(1 + r/m)^{mn}$. More frequent compounding gives a higher value for the same stated rate, so monthly &gt; quarterly &gt; semi-annual &gt; annual.</li>
<li><strong>Continuous compounding:</strong> $FV = PV\,e^{rn}$, the limit as $m \to \infty$.</li>
<li><strong>Effective annual rate:</strong> $EAR = (1 + r/m)^m - 1$.</li>
</ul>
<h3>Solving for the rate or the time</h3>
<ul>
<li>Rate that turns $PV$ into $FV$ in $n$ years: $r = (FV/PV)^{1/n} - 1$. This is the <strong>annualised return</strong> (CAGR).</li>
<li>Years needed: $n = \dfrac{\ln(FV/PV)}{\ln(1+r)}$.</li>
<li><strong>Rule of 72:</strong> doubling time is roughly $72 / (r \text{ in } \%)$. At 8% that is 9 years.</li>
</ul>
<h3>Returns over several periods</h3>
<p>Returns multiply: $(1+R_{\text{total}}) = (1+r_1)(1+r_2)\cdots$. A 34% two-year return with 16% in year one means $r_2 = 1.34/1.16 - 1 = 15.5\%$.</p>`
      },
      {
        title: 'Perpetuities and annuities',
        weight: 'high',
        html: R`
<p>All formulas assume the first payment $C$ arrives one period from now.</p>
<ul>
<li><strong>Perpetuity</strong> (pays $C$ forever): $PV = C/r$.</li>
<li><strong>Growing perpetuity</strong> (payments grow at $g &lt; r$): $PV = C_1/(r-g)$.</li>
<li><strong>Annuity</strong> (pays $C$ for $n$ periods): $PV = \dfrac{C}{r}\left[1 - \dfrac{1}{(1+r)^n}\right]$.</li>
<li><strong>Future value of an annuity</strong> (SIP, recurring deposit): $FV = C\,\dfrac{(1+r)^n - 1}{r}$.</li>
</ul>
<h3>Delayed streams</h3>
<p>A perpetuity whose first payment is at year $T$ is worth $C/r$ at year $T-1$. Discount that back: $PV_0 = \dfrac{C/r}{(1+r)^{T-1}}$.</p>
<h3>EMI</h3>
<p>A loan $L$ is the present value of its EMIs, so invert the annuity formula:</p>
$$EMI = \frac{L\,r}{1 - (1+r)^{-n}}$$
<p>with $r$ the rate per instalment period and $n$ the number of instalments.</p>
<p class="key">A perpetuity's PV rises when payments are larger, when they grow, or when the discount rate falls. It falls when payments are delayed.</p>`
      },
      {
        title: 'Investment decision rules: NPV, IRR, payback, PI',
        weight: 'high',
        html: R`
<ul>
<li><strong>NPV</strong> $= -C_0 + \sum_t \dfrac{C_t}{(1+r)^t}$. Accept if NPV &gt; 0. Among mutually exclusive projects pick the highest NPV.</li>
<li><strong>IRR</strong> is the discount rate at which NPV = 0. Accept if IRR &gt; cost of capital. For a single future payoff, $IRR = (FV/C_0)^{1/n} - 1$.</li>
<li><strong>Payback period</strong>: the time until cumulative (undiscounted) cash inflows recover the initial cost. It ignores the time value of money and everything after payback.</li>
<li><strong>Profitability index</strong> $PI = \dfrac{PV \text{ of future cash flows}}{C_0}$. Accept if PI &gt; 1. $PI &gt; 1 \iff NPV &gt; 0$.</li>
</ul>
<h3>What each rule is good for</h3>
<ul>
<li>NPV is the theoretically correct rule: it measures value added in rupees.</li>
<li>Payback suits a capital-constrained entrepreneur who needs the money back fast, especially when interest rates are high.</li>
<li>PI ranks projects when capital is rationed.</li>
<li>IRR can mislead when comparing projects of different scale or timing. It is not always greater than the cost of capital.</li>
</ul>
<p class="trap">For IRR with two cash flows and MCQ options, plug the options in rather than solving the quadratic.</p>`
      },
      {
        title: 'Bonds: pricing, yield, maturity and duration',
        weight: 'high',
        html: R`
<p>A bond is a fixed-income security: the issuer promises fixed payments at fixed dates. Bondholders are lenders, not owners.</p>
<ul>
<li><strong>Zero-coupon bond:</strong> one payment $F$ at maturity, no interim payments. Price $P = F/(1+y)^n$, so yield $y = (F/P)^{1/n} - 1$.</li>
<li><strong>Coupon bond:</strong> price is the PV of all coupons plus the face value.</li>
<li><strong>Price and yield move in opposite directions.</strong> When market rates rise, existing bonds fall in price.</li>
<li><strong>Maturity:</strong> the date of the last payment.</li>
<li><strong>Duration:</strong> the weighted-average time of the payments. Simple version: $D = \sum t\,C_t / \sum C_t$. Macaulay duration uses present values as weights. For a zero-coupon bond, duration = maturity.</li>
</ul>
<h3>Interest-rate sensitivity</h3>
<p>Longer duration means a bigger price change for the same change in rates:</p>
$$\frac{\Delta P}{P} \approx -\frac{D}{1+y}\,\Delta y$$
<p>For a zero-coupon bond you can also compute it exactly as $\left(\dfrac{1+y_{\text{old}}}{1+y_{\text{new}}}\right)^n - 1$. One basis point is 0.01%.</p>
<p>Short-term bonds are preferred when you want less exposure to rate changes and the ability to reinvest sooner at new rates.</p>
<h3>Risk</h3>
<ul>
<li><strong>Default (credit) risk</strong> is graded by rating agencies: Standard &amp; Poor's, Moody's and Fitch. (Standard Chartered is a bank.)</li>
<li><strong>Stocks vs bonds:</strong> stocks carry ownership claims on profits, have no maturity and no promised payments.</li>
</ul>`
      },
      {
        title: 'Yield curve and forward rates',
        weight: 'medium',
        html: R`
<p>The <strong>yield curve</strong> plots interest rates against <em>time to maturity</em> for bonds of the same credit quality. It does not plot rates against default risk.</p>
<ul>
<li><strong>Normal:</strong> upward sloping. Short-term rates are lower than long-term rates.</li>
<li><strong>Inverted:</strong> downward sloping. Often read as a predictor of recession.</li>
<li><strong>Flat</strong> and <strong>humped</strong> curves also occur.</li>
</ul>
<h3>Forward rate</h3>
<p>Investing for two years at the 2-year rate must match investing for one year and rolling over at the forward rate:</p>
$$(1+y_2)^2 = (1+y_1)(1+f_{1,2}) \;\Rightarrow\; f_{1,2} = \frac{(1+y_2)^2}{1+y_1} - 1$$
<p>With $y_1 = 4\%$ and $y_2 = 4.5\%$: $f = 1.045^2/1.04 - 1 \approx 5.00\%$.</p>`
      },
      {
        title: 'Stock valuation: Gordon growth model',
        weight: 'medium',
        html: R`
<p>A stock is worth the present value of its dividends. If the dividend next year is $D_1$ and it grows at a constant rate $g$ forever, with required return $r &gt; g$:</p>
$$P_0 = \frac{D_1}{r - g}$$
<p>Rearrangements: $r = \dfrac{D_1}{P_0} + g$ (dividend yield plus growth) and $g = r - \dfrac{D_1}{P_0}$.</p>
<h3>Over- or under-priced?</h3>
<ul>
<li>Market price &gt; model value → <strong>overpriced</strong> → sell.</li>
<li>Market price &lt; model value → <strong>underpriced</strong> → buy.</li>
</ul>
<p>Example: $D_1 = 20$, $g = 3\%$, $r = 10\%$ gives a value of $20/0.07 = 285.7$. A market price of 300 is too high, so the stock is overpriced.</p>`
      },
      {
        title: 'GDP, CPI and inflation',
        weight: 'high',
        html: R`
<ul>
<li><strong>Nominal GDP</strong> values output at current prices. <strong>Real GDP</strong> values it at base-year prices, so it tracks quantities only.</li>
<li><strong>GDP deflator</strong> $= \dfrac{\text{Nominal GDP}}{\text{Real GDP}} \times 100$.</li>
<li>If nominal GDP rises and real GDP is unchanged, only <em>prices</em> rose, by the same percentage.</li>
</ul>
<h3>Consumer Price Index</h3>
<p>Fix a basket of goods. Then</p>
$$CPI_t = \frac{\text{Cost of basket at year-}t\text{ prices}}{\text{Cost of basket at base-year prices}} \times 100$$
<p>Inflation between two years is the percentage change in the CPI: $\pi = \dfrac{CPI_t - CPI_{t-1}}{CPI_{t-1}}$. When asked for inflation "with respect to" a year, divide by that year's CPI, not the base year's.</p>`
      },
      {
        title: 'Real and nominal interest rates',
        weight: 'medium',
        html: R`
<p>The nominal rate $i$ is what the bank quotes. The real rate $r$ is the growth in purchasing power after inflation $\pi$.</p>
$$(1+i) = (1+r)(1+\pi) \;\Rightarrow\; r = \frac{1+i}{1+\pi} - 1$$
<p>The approximation $r \approx i - \pi$ is fine for intuition, but the exam options are built on the exact formula.</p>
<ul>
<li>If expected inflation equals the nominal rate, the real rate is zero.</li>
<li>If inflation exceeds the nominal rate, the real rate is negative.</li>
<li>To find expected inflation: $\pi = \dfrac{1+i}{1+r} - 1$.</li>
</ul>`
      },
      {
        title: 'Intertemporal choice',
        weight: 'medium',
        html: R`
<p>A consumer earns $Y_1$ now and $Y_2$ next period, and can borrow or lend at rate $r$. Consumption must satisfy</p>
$$C_1 + \frac{C_2}{1+r} = Y_1 + \frac{Y_2}{1+r}$$
<ul>
<li>Plotted with $C_1$ on the horizontal axis, the budget line has slope $-(1+r)$: giving up one unit today buys $1+r$ units tomorrow.</li>
<li>Maximum consumption today (consume nothing later): $Y_1 + \dfrac{Y_2}{1+r}$.</li>
<li>Maximum consumption tomorrow (consume nothing today): $Y_1(1+r) + Y_2$.</li>
<li>The line always passes through the endowment point $(Y_1, Y_2)$.</li>
</ul>
<p>A slope of $-1.12$ means $r = 12\%$, whatever the incomes are.</p>`
      },
      {
        title: 'Securitisation and tranches',
        weight: 'low',
        html: R`
<p>Pool several risky bonds and slice the pooled cash flow into tranches. The <strong>senior</strong> tranche is paid first, the <strong>junior</strong> tranche is paid last and absorbs the first losses.</p>
<p>With two bonds, each defaulting with probability $p$:</p>
<ul>
<li>Junior defaults if <em>at least one</em> bond defaults. Senior defaults only if <em>both</em> default.</li>
<li><strong>Independent bonds:</strong> senior $= p^2$, junior $= 1 - (1-p)^2$.</li>
<li><strong>Perfectly correlated bonds:</strong> they default together, so senior $=$ junior $= p$. Tranching gives no protection.</li>
</ul>
<p>With $p = 10\%$: independent gives 1% and 19%. Perfectly correlated gives 10% for both.</p>`
      }
    ],

    formulas: [
      {
        group: 'Compounding and discounting',
        items: [
          { name: 'Future value', tex: R`FV = PV\,(1+r)^n` },
          { name: 'Present value', tex: R`PV = \frac{FV}{(1+r)^n}` },
          { name: 'm times a year', tex: R`FV = PV\left(1+\frac{r}{m}\right)^{mn}` },
          { name: 'Continuous compounding', tex: R`FV = PV\,e^{rn}` },
          { name: 'Effective annual rate', tex: R`EAR = \left(1+\frac{r}{m}\right)^{m} - 1` },
          { name: 'Annualised return', tex: R`r = \left(\frac{FV}{PV}\right)^{1/n} - 1` },
          { name: 'Time to reach a target', tex: R`n = \frac{\ln(FV/PV)}{\ln(1+r)}`, note: R`Rule of 72: doubling time $\approx 72/r\%$.` },
          { name: 'Multi-period return', tex: R`1 + R_{\text{total}} = (1+r_1)(1+r_2)\cdots(1+r_n)` }
        ]
      },
      {
        group: 'Perpetuities and annuities',
        items: [
          { name: 'Perpetuity', tex: R`PV = \frac{C}{r}` },
          { name: 'Growing perpetuity', tex: R`PV = \frac{C_1}{r-g}`, note: R`Requires $g < r$.` },
          { name: 'Delayed perpetuity', tex: R`PV_0 = \frac{C}{r}\cdot\frac{1}{(1+r)^{T-1}}`, note: R`First payment at year $T$.` },
          { name: 'Annuity (PV)', tex: R`PV = \frac{C}{r}\left[1 - \frac{1}{(1+r)^n}\right]` },
          { name: 'Annuity (FV) / SIP', tex: R`FV = C\,\frac{(1+r)^n - 1}{r}` },
          { name: 'EMI', tex: R`EMI = \frac{L\,r}{1-(1+r)^{-n}}`, note: 'r and n per instalment period.' }
        ]
      },
      {
        group: 'Investment rules',
        items: [
          { name: 'Net present value', tex: R`NPV = -C_0 + \sum_{t=1}^{n}\frac{C_t}{(1+r)^t}` },
          { name: 'Internal rate of return', tex: R`-C_0 + \sum_{t=1}^{n}\frac{C_t}{(1+IRR)^t} = 0` },
          { name: 'Profitability index', tex: R`PI = \frac{\sum_t C_t/(1+r)^t}{C_0} = 1 + \frac{NPV}{C_0}` },
          { name: 'Payback period', tex: R`\min\Big\{T : \sum_{t=1}^{T} C_t \ge C_0\Big\}`, note: 'Undiscounted cash flows.' }
        ]
      },
      {
        group: 'Bonds',
        items: [
          { name: 'Zero-coupon price', tex: R`P = \frac{F}{(1+y)^n}` },
          { name: 'Zero-coupon yield', tex: R`y = \left(\frac{F}{P}\right)^{1/n} - 1` },
          { name: 'Simple duration', tex: R`D = \frac{\sum_t t\,C_t}{\sum_t C_t}` },
          { name: 'Macaulay duration', tex: R`D = \frac{\sum_t t\,C_t/(1+y)^t}{\sum_t C_t/(1+y)^t}` },
          { name: 'Price sensitivity', tex: R`\frac{\Delta P}{P} \approx -\frac{D}{1+y}\,\Delta y` },
          { name: 'Exact, zero-coupon', tex: R`\frac{\Delta P}{P} = \left(\frac{1+y_{\text{old}}}{1+y_{\text{new}}}\right)^{n} - 1` },
          { name: 'Forward rate', tex: R`f_{1,2} = \frac{(1+y_2)^2}{1+y_1} - 1` }
        ]
      },
      {
        group: 'Stocks',
        items: [
          { name: 'Gordon growth model', tex: R`P_0 = \frac{D_1}{r-g}` },
          { name: 'Implied growth / return', tex: R`g = r - \frac{D_1}{P_0}, \qquad r = \frac{D_1}{P_0} + g` }
        ]
      },
      {
        group: 'Macro and real rates',
        items: [
          { name: 'GDP deflator', tex: R`\text{Deflator} = \frac{\text{Nominal GDP}}{\text{Real GDP}} \times 100` },
          { name: 'CPI', tex: R`CPI_t = \frac{\sum_k q_k\,p_{k,t}}{\sum_k q_k\,p_{k,0}} \times 100` },
          { name: 'Inflation rate', tex: R`\pi_t = \frac{CPI_t - CPI_{t-1}}{CPI_{t-1}}` },
          { name: 'Fisher equation', tex: R`1 + i = (1+r)(1+\pi)`, note: R`$i$ nominal, $r$ real, $\pi$ inflation.` }
        ]
      },
      {
        group: 'Intertemporal choice and tranches',
        items: [
          { name: 'Budget constraint', tex: R`C_1 + \frac{C_2}{1+r} = Y_1 + \frac{Y_2}{1+r}`, note: R`Slope $= -(1+r)$.` },
          { name: 'Max consumption today', tex: R`C_1^{\max} = Y_1 + \frac{Y_2}{1+r}` },
          { name: 'Two-bond tranches (independent)', tex: R`P(\text{senior}) = p^2, \qquad P(\text{junior}) = 1-(1-p)^2`, note: R`Perfectly correlated: both equal $p$.` }
        ]
      }
    ],

    examples: [
      {
        tag: 'Annualised return',
        q: R`<p>Ria invests Rs 10,000 in a fund that triples her money in 12 years. What annual rate (compounded annually) did she earn?</p>`,
        a: R`<p>$3 = (1+r)^{12} \Rightarrow r = 3^{1/12} - 1$.</p><p>$\ln 3 = 1.0986$, divided by 12 is $0.09155$, and $e^{0.09155} = 1.0959$.</p><p><strong>$r \approx 9.59\%$.</strong> The amount invested is irrelevant: only the ratio matters.</p>`
      },
      {
        tag: 'EMI',
        q: R`<p>You borrow Rs 2,00,000 at 1% per month, repaid in 24 equal monthly instalments. Find the EMI.</p>`,
        a: R`<p>$EMI = \dfrac{L\,r}{1-(1+r)^{-n}} = \dfrac{200000 \times 0.01}{1 - 1.01^{-24}}$.</p><p>$1.01^{24} = 1.2697$, so $1.01^{-24} = 0.7876$ and the denominator is $0.2124$.</p><p><strong>EMI $\approx$ Rs 9,415.</strong> Sanity check: with no interest it would be 8,333, so the answer must be above that.</p>`
      },
      {
        tag: 'NPV comparison and profitability index',
        q: R`<p>Each project costs Rs 40 lakh today, required return 10%. A pays 30 lakh after 2 years and 40 lakh after 5 years. B pays 10 lakh a year for 6 years. C pays 100 lakh after 10 years. Which should be chosen by NPV, and what is B's profitability index?</p>`,
        a: R`
<p><strong>A:</strong> $30/1.1^2 + 40/1.1^5 = 24.79 + 24.84 = 49.63$. NPV $= 9.63$.</p>
<p><strong>B:</strong> annuity factor $= (1 - 1.1^{-6})/0.1 = 4.3553$. PV $= 43.55$. NPV $= 3.55$.</p>
<p><strong>C:</strong> $100/1.1^{10} = 38.55$. NPV $= -1.45$.</p>
<p><strong>Choose A</strong> (highest NPV). B's PI $= 43.55/40 = $ <strong>1.09</strong>.</p>`
      },
      {
        tag: 'Bond price sensitivity',
        q: R`<p>A 10-year zero-coupon bond pays 1000 at maturity. The rate rises from 5% to 5.2% (20 basis points). By what percentage does the bond's value change?</p>`,
        a: R`<p>Price is $1000/(1+y)^{10}$, so the ratio of new to old price is $\left(\dfrac{1.05}{1.052}\right)^{10} = (0.998099)^{10} = 0.9812$.</p><p><strong>The value falls by about 1.88%.</strong></p><p>Quick check with duration: $-\dfrac{10}{1.05}\times 0.002 = -1.90\%$. Close, and the sign is negative because rates rose.</p>`
      },
      {
        tag: 'CPI and inflation',
        q: R`<p>The basket is 1 unit of clothes, 3 of food, 2 of fuel. Prices in 2022 (base): 200, 50, 75. In 2023: 180, 70, 80. In 2024: 220, 80, 100. Find the CPI in 2024 and the inflation rate in 2024 relative to 2023.</p>`,
        a: R`
<p>Basket cost 2022: $200 + 150 + 150 = 500$.</p>
<p>Basket cost 2023: $180 + 210 + 160 = 550$, so $CPI_{2023} = 110$.</p>
<p>Basket cost 2024: $220 + 240 + 200 = 660$, so <strong>$CPI_{2024} = 132$</strong>.</p>
<p>Inflation 2023→2024: $(132 - 110)/110 = $ <strong>20%</strong>. (32% would be inflation relative to the base year.)</p>`
      },
      {
        tag: 'SIP future value',
        q: R`<p>You invest Rs 24,000 at the end of each year for 20 years in a fund earning 7.5% a year. What is the value after 20 years?</p>`,
        a: R`<p>$FV = C\,\dfrac{(1+r)^n - 1}{r} = 24000 \times \dfrac{1.075^{20} - 1}{0.075}$.</p><p>$1.075^{20} = 4.2479$, so the factor is $3.2479/0.075 = 43.305$.</p><p><strong>FV $\approx$ Rs 10,39,312.</strong> You contributed only 4,80,000. The rest is compounding.</p>`
      },
      {
        tag: 'Delayed perpetuity',
        q: R`<p>Project A pays Rs 500 a year forever starting next year. Project B pays Rs 1,000 a year forever starting 10 years from today. The rate is 10%. Which has the higher present value?</p>`,
        a: R`<p><strong>A:</strong> $500/0.10 = 5000$.</p><p><strong>B:</strong> at year 9 it is worth $1000/0.10 = 10000$. Today: $10000/1.1^9 = 10000/2.358 = 4241$.</p><p><strong>Project A</strong> is worth more, even though B pays twice as much each year.</p>`
      },
      {
        tag: 'Intertemporal budget',
        q: R`<p>Sahil earns Rs 50,000 in period 1 and Rs 60,000 in period 2. The interest rate is 20%. What is the most he can consume in period 1? What is the slope of his budget line?</p>`,
        a: R`<p>He can borrow against period-2 income: $C_1^{\max} = 50000 + \dfrac{60000}{1.2} = $ <strong>Rs 1,00,000</strong>.</p><p>Slope $= -(1+r) = $ <strong>−1.2</strong>.</p>`
      }
    ],

    quiz: [
      { q: R`Rs 5,000 is invested at 8% a year, compounded annually. Its value after 3 years is closest to`, options: ['Rs 6,200', 'Rs 6,299', 'Rs 6,356', 'Rs 6,500'], answer: 1, why: R`$5000 \times 1.08^3 = 5000 \times 1.2597 = 6298.6$. Rs 6,200 is simple interest.` },
      { q: R`A perpetuity pays Rs 600 a year starting next year. At a discount rate of 8%, its present value is`, options: ['Rs 4,800', 'Rs 6,480', 'Rs 7,500', 'Rs 48,000'], answer: 2, why: R`$PV = C/r = 600/0.08 = 7500$.` },
      { q: R`The nominal interest rate is 9% and expected inflation is 5%. The real interest rate is`, options: ['4.00%', '3.81%', '14.45%', '1.80%'], answer: 1, why: R`$1.09/1.05 - 1 = 3.81\%$. The 4% option is the approximation.` },
      { q: R`A stock will pay a dividend of Rs 12 next year, growing at 5% a year. The required return is 11%. Its market price is Rs 230. According to the Gordon model the stock is`, options: ['Underpriced, buy', 'Overpriced, sell', 'Fairly priced', 'Underpriced, sell'], answer: 1, why: R`Model value $= 12/(0.11 - 0.05) = 200$. The market price of 230 is above that, so it is overpriced.` },
      { q: R`A bond pays Rs 300 in 2 years and Rs 700 in 6 years. Its maturity and simple duration are`, options: ['6 years, 4.8 years', '4.8 years, 6 years', '6 years, 4 years', '8 years, 4.8 years'], answer: 0, why: R`Maturity is the last payment date: 6 years. Duration $= (300\times2 + 700\times6)/1000 = 4.8$ years.` },
      { q: R`Nominal GDP is 18,000 units and real GDP is 15,000 units. The GDP deflator is`, options: ['83.3', '120', '125', '130'], answer: 1, why: R`$18000/15000 \times 100 = 120$.` },
      { q: R`An investment costs Rs 8,000 today and pays Rs 9,680 after two years. Its IRR is`, options: ['10%', '10.5%', '21%', '9.2%'], answer: 0, why: R`$(9680/8000)^{1/2} - 1 = \sqrt{1.21} - 1 = 10\%$. 21% is the total return, not the annual rate.` },
      { q: R`The 1-year rate is 5% and the 2-year annualised rate is 6%. The implied 1-year rate one year from now is closest to`, options: ['5.50%', '6.00%', '7.01%', '11.00%'], answer: 2, why: R`$1.06^2/1.05 - 1 = 1.1236/1.05 - 1 = 7.01\%$.` },
      { q: R`A project costs Rs 9,000 and returns Rs 2,000, Rs 3,000, Rs 4,000 and Rs 5,000 in years 1 to 4. Its payback period is`, options: ['2 years', '3 years', '4 years', 'It never pays back'], answer: 1, why: R`Cumulative inflows: 2,000 → 5,000 → 9,000. The cost is recovered at the end of year 3.` },
      { q: R`Which of the following is TRUE?`, options: ['An inverted yield curve means long-term rates are above short-term rates.', 'A zero-coupon bond makes no payments before maturity.', 'When market interest rates rise, existing bond prices rise.', 'The IRR is the rate at which NPV is maximised.'], answer: 1, why: R`A zero-coupon bond pays only at maturity. Inverted means short rates exceed long rates, bond prices fall when rates rise, and IRR is where NPV equals zero.` },
      { q: R`Two bonds each default with probability 10% and are perfectly correlated. They are pooled into a senior and a junior tranche. The probability that the junior tranche defaults is`, options: ['1%', '10%', '19%', '20%'], answer: 1, why: R`Perfectly correlated bonds default together, so both tranches default with probability 10%. 19% is the answer for independent bonds.` },
      { q: R`Money quadruples in 20 years. The annual rate of return (compounded annually) is closest to`, options: ['5.00%', '7.18%', '15.00%', '20.00%'], answer: 1, why: R`$4^{1/20} - 1 = 2^{1/10} - 1 = 7.18\%$.` }
    ]
  });
})();
