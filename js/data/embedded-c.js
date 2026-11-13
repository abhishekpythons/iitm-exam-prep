(function () {
  const R = String.raw;
  window.SUBJECTS.push({
    id: 'embedded-c',
    name: 'Embedded C Programming',
    short: 'Embedded C',
    level: 'Foundation / Diploma level (Electronic Systems)',
    color: '#1c7fb8',
    blurb: 'Embedded system basics, microcontroller architecture, C data types and bitwise operations, memory-mapped registers, GPIO, UART, ADC, timers and PWM.',
    chips: ['Bit masks', 'Registers', 'GPIO', 'UART', 'ADC & timers'],
    papers: 'Quiz 1 papers from Jul 2024 and Oct 2025. The code snippets in several questions are images, so the notes cover every operation the answer options point to.',

    pattern: {
      facts: [
        { k: 'Total marks', v: '50' },
        { k: 'Questions', v: '17 – 18' },
        { k: 'Question types', v: 'MCQ, a few MSQ, 1 numeric' },
        { k: 'Marks each', v: '2 – 4' }
      ],
      rows: [
        { topic: 'Bitwise operations and masks', how: R`Result of an expression such as <code>6 ^ 3</code> or <code>(x >> n) & 1</code>, the mask for bit $n$, what <code>x |= mask</code> / <code>x &= ~mask</code> / <code>x ^= mask</code> does, final value of a register after several operations (4-mark questions).`, weight: 'high' },
        { topic: 'Memory-mapped registers', how: R`Base address plus offsets: "4 registers of 32 bits start at 0x40000000, address of the last one?" Pointer casts such as <code>(int*)v</code>.`, weight: 'high' },
        { topic: 'Embedded system fundamentals', how: R`Key requirements (real-time, compact, low power), typical components, role of peripherals, MCU vs MPU, purpose of an RTOS.`, weight: 'high' },
        { topic: 'Microcontroller architecture and memory', how: R`ALU vs control unit, how the CPU talks to memory (address + control signals), Flash vs RAM.`, weight: 'medium' },
        { topic: 'GPIO code reading', how: R`What does <code>digitalWrite(13, HIGH)</code> do? What does a toggle line in a blink loop do?`, weight: 'medium' },
        { topic: 'UART', how: R`Asynchronous, separate TX/RX. Decode frame notation such as 8N1, identify parity and stop bits from a waveform or setting.`, weight: 'high' },
        { topic: 'ADC', how: R`Purpose of an ADC, resolution (step size) of an $n$-bit ADC over a voltage range, digital code for a given voltage (numeric).`, weight: 'medium' },
        { topic: 'Timers, prescaler, PWM', how: R`Use of timers (precise delays), what a prescaler does, how PWM is generated (timer/counter), choosing a prescaler for a long interval.`, weight: 'medium' },
        { topic: 'Data types', how: R`Pick the smallest fixed-width type that holds a value, for example 100,000 ms needs <code>uint32_t</code>.`, weight: 'medium' }
      ]
    },

    tips: [
      R`Convert hex to binary before doing any bitwise question. Each hex digit is 4 bits: <code>0x3C</code> = <code>0011 1100</code>.`,
      R`Bit positions are 0-indexed from the right unless stated otherwise. The mask for bit $n$ is <code>1 &lt;&lt; n</code>: bit 3 → <code>0x08</code>, bit 4 → <code>0x10</code>.`,
      R`A 32-bit register occupies 4 bytes, so consecutive registers are 4 addresses apart. The $k$-th register (counting from 0) is at base + $4k$. The last of 4 is at base + <code>0xC</code>, not base + <code>0x10</code>.`,
      R`Hex addition trips people up: <code>0x8 + 0x4 = 0xC</code> and <code>0xC + 0x4 = 0x10</code>.`,
      R`UART notation is data bits, parity, stop bits: <strong>8N1</strong> = 8 data, No parity, 1 stop. The baud rate after the @ does not change the frame format.`,
      R`ADC step size is $V_{ref}/2^n$. For 10 bits over 5 V that is about 4.9 mV, so the nearest option is 0.005 V.`
    ],

    topics: [
      {
        title: 'What makes a system "embedded"',
        weight: 'high',
        html: R`
<p>An embedded system is a computer built into a larger product to do a <strong>dedicated task</strong>, such as a washing-machine controller, an engine control unit or a fitness band.</p>
<h3>Key requirements</h3>
<ul>
<li><strong>Real-time operation:</strong> respond within a guaranteed time.</li>
<li><strong>Compact design</strong>, low cost, low power.</li>
<li><strong>Reliability:</strong> runs for years without a reboot.</li>
<li>Limited memory and processing power. "Unlimited processing power" or "extensive memory" are never requirements.</li>
</ul>
<h3>Typical components</h3>
<ul>
<li><strong>Processor</strong> (the CPU core).</li>
<li><strong>Memory</strong>: Flash for the program, RAM for data.</li>
<li><strong>Peripherals</strong>: timers, ADC, UART and so on. Their role is to <em>interface with the external environment</em>.</li>
<li><strong>I/O ports</strong>, <strong>sensors</strong> and <strong>actuators</strong>.</li>
</ul>
<p class="trap">An IDE and a compiler are <em>development tools</em> that run on your PC. They are not components of the embedded system itself.</p>
<h3>RTOS</h3>
<p>A real-time operating system schedules tasks so that they execute in a <strong>timely and deterministic</strong> way. Its main job is meeting deadlines, not providing a user interface, multimedia or power management.</p>`
      },
      {
        title: 'Microcontroller vs microprocessor',
        weight: 'high',
        html: R`
<table>
<tr><th></th><th>Microcontroller (MCU)</th><th>Microprocessor (MPU)</th></tr>
<tr><td>On the chip</td><td>CPU + Flash + RAM + peripherals</td><td>CPU only; memory and peripherals are external</td></tr>
<tr><td>Power, cost</td><td>Low, with sleep modes</td><td>Higher</td></tr>
<tr><td>Software</td><td>Bare-metal or RTOS</td><td>Full OS (Linux, Windows)</td></tr>
<tr><td>Typical use</td><td>Oven sensor, irrigation controller, LED panel</td><td>Desktop PC, smartphone, anything running a desktop OS</td></tr>
</table>
<p>An MCU suits low-power embedded applications because of its <strong>integrated peripherals and low-power modes</strong>.</p>`
      },
      {
        title: 'Inside the microcontroller: CPU, buses, memory',
        weight: 'medium',
        html: R`
<h3>CPU</h3>
<ul>
<li><strong>ALU</strong> (arithmetic logic unit): performs arithmetic and logical operations.</li>
<li><strong>Control unit (CU)</strong>: fetches and <em>decodes instructions</em> and controls the operation of the other units.</li>
<li><strong>Registers</strong>: small, fast storage inside the CPU, including the program counter and stack pointer.</li>
</ul>
<h3>Talking to memory</h3>
<p>The CPU places an <strong>address</strong> on the address bus and uses <strong>control signals</strong> (read / write) to move data over the data bus. Peripherals are accessed the same way when they are memory-mapped.</p>
<h3>Memory types</h3>
<table>
<tr><th>Type</th><th>Volatile?</th><th>Holds</th></tr>
<tr><td>Flash</td><td>No, retains data without power</td><td>Program code, constants</td></tr>
<tr><td>RAM</td><td>Yes, lost at power-off</td><td>Variables, stack, heap</td></tr>
<tr><td>EEPROM</td><td>No</td><td>Small amounts of settings / calibration data</td></tr>
</table>
<p>The main advantage of Flash is that it is <strong>non-volatile</strong>. It is slower to write than RAM.</p>`
      },
      {
        title: 'C data types for embedded work',
        weight: 'medium',
        html: R`
<p>Plain <code>int</code> has different sizes on different processors (16 bits on an 8-bit AVR, 32 bits on ARM). Embedded code uses the fixed-width types from <code>&lt;stdint.h&gt;</code>.</p>
<table>
<tr><th>Type</th><th>Bits</th><th>Range</th></tr>
<tr><td><code>uint8_t</code></td><td>8</td><td>0 to 255</td></tr>
<tr><td><code>int8_t</code></td><td>8</td><td>−128 to 127</td></tr>
<tr><td><code>uint16_t</code></td><td>16</td><td>0 to 65,535</td></tr>
<tr><td><code>int16_t</code></td><td>16</td><td>−32,768 to 32,767</td></tr>
<tr><td><code>uint32_t</code></td><td>32</td><td>0 to 4,294,967,295</td></tr>
<tr><td><code>int32_t</code></td><td>32</td><td>about ±2.1 billion</td></tr>
</table>
<ul>
<li>Choose the <em>smallest type that fits</em>. A count up to 100,000 does not fit in 16 bits (max 65,535), so use <code>uint32_t</code>.</li>
<li>Unsigned arithmetic wraps around: a <code>uint8_t</code> holding 250, plus 10, becomes 4.</li>
<li><code>volatile</code> tells the compiler a value can change outside the program flow (hardware registers, variables shared with interrupts), so it must not optimise accesses away.</li>
<li><code>const</code> data can be placed in Flash.</li>
</ul>
<h3>Pointers and casts</h3>
<p>A <code>void*</code> is a generic pointer. To use it as an integer pointer, cast the pointer itself: <code>p = (int*)v;</code>. Writing <code>(int)v</code> converts the address to a number, and <code>(int*)&amp;v</code> points at the pointer variable instead of the data.</p>`
      },
      {
        title: 'Bitwise operators',
        weight: 'high',
        html: R`
<table>
<tr><th>Operator</th><th>Name</th><th>Bit result is 1 when</th><th>Example (4-bit)</th></tr>
<tr><td><code>&amp;</code></td><td>AND</td><td>both bits are 1</td><td>0110 &amp; 0011 = 0010</td></tr>
<tr><td><code>|</code></td><td>OR</td><td>at least one bit is 1</td><td>0110 | 0011 = 0111</td></tr>
<tr><td><code>^</code></td><td>XOR</td><td>the bits differ</td><td>0110 ^ 0011 = 0101</td></tr>
<tr><td><code>~</code></td><td>NOT</td><td>the bit was 0 (inverts all bits)</td><td>~0110 = 1001</td></tr>
<tr><td><code>&lt;&lt;</code></td><td>left shift</td><td>moves bits left, fills with 0</td><td>0011 &lt;&lt; 2 = 1100</td></tr>
<tr><td><code>&gt;&gt;</code></td><td>right shift</td><td>moves bits right</td><td>1100 &gt;&gt; 2 = 0011</td></tr>
</table>
<ul>
<li><code>6 ^ 3</code>: 110 XOR 011 = 101 = <strong>5</strong>.</li>
<li><code>x &lt;&lt; n</code> multiplies by $2^n$. <code>x &gt;&gt; n</code> divides an unsigned value by $2^n$.</li>
<li>XOR with 1 flips a bit, XOR with 0 keeps it. XOR with <code>0xFF</code> inverts a whole byte.</li>
</ul>
<p class="trap"><code>&amp;</code> and <code>|</code> are bitwise. <code>&amp;&amp;</code> and <code>||</code> are logical and return only 0 or 1. <code>~</code> is bitwise NOT, <code>!</code> is logical NOT.</p>`
      },
      {
        title: 'Bit masking: set, clear, toggle, test',
        weight: 'high',
        html: R`
<p>Registers pack many settings into one word, so you must change some bits without touching the rest. A <strong>mask</strong> has 1s at the bits you care about.</p>
<table>
<tr><th>Goal</th><th>Code</th><th>Why it works</th></tr>
<tr><td>Set bit $n$</td><td><code>x |= (1 &lt;&lt; n);</code></td><td>OR with 1 forces 1, OR with 0 keeps</td></tr>
<tr><td>Clear bit $n$</td><td><code>x &amp;= ~(1 &lt;&lt; n);</code></td><td>AND with 0 forces 0, AND with 1 keeps</td></tr>
<tr><td>Toggle bit $n$</td><td><code>x ^= (1 &lt;&lt; n);</code></td><td>XOR with 1 flips</td></tr>
<tr><td>Test bit $n$</td><td><code>if (x &amp; (1 &lt;&lt; n))</code></td><td>non-zero only if the bit is 1</td></tr>
<tr><td>Read bit $n$ as 0/1</td><td><code>(x &gt;&gt; n) &amp; 1</code></td><td>shift it to position 0, mask the rest</td></tr>
<tr><td>Extract a field</td><td><code>(x &gt;&gt; pos) &amp; mask</code></td><td>for example bits 5:4 → <code>(x &gt;&gt; 4) &amp; 0x3</code></td></tr>
<tr><td>Write a field</td><td><code>x = (x &amp; ~(m &lt;&lt; pos)) | (v &lt;&lt; pos);</code></td><td>clear the field, then OR in the value</td></tr>
</table>
<p>In general: <code>x |= mask</code> sets the masked bits, <code>x &amp;= ~mask</code> clears them, <code>x ^= mask</code> toggles them.</p>
<h3>Masks to recognise</h3>
<p>bit 0 → <code>0x01</code>, bit 1 → <code>0x02</code>, bit 2 → <code>0x04</code>, bit 3 → <code>0x08</code>, bit 4 → <code>0x10</code>, bit 5 → <code>0x20</code>, bit 6 → <code>0x40</code>, bit 7 → <code>0x80</code>. Lower nibble <code>0x0F</code>, upper nibble <code>0xF0</code>.</p>`
      },
      {
        title: 'Memory-mapped registers',
        weight: 'high',
        html: R`
<p>Peripherals are controlled through registers that live at fixed memory addresses. Writing to the address changes the hardware.</p>
<pre><code>#define GPIO_BASE  0x40000000
#define GPIO_DIR   (*(volatile uint32_t *)(GPIO_BASE + 0x00))
#define GPIO_OUT   (*(volatile uint32_t *)(GPIO_BASE + 0x04))

GPIO_DIR |= (1 &lt;&lt; 5);   // make pin 5 an output
GPIO_OUT |= (1 &lt;&lt; 5);   // drive pin 5 high</code></pre>
<ul>
<li>The cast turns the number into a pointer to a 32-bit register. The leading <code>*</code> dereferences it.</li>
<li><code>volatile</code> is essential, because hardware can change the value at any time.</li>
</ul>
<h3>Address arithmetic</h3>
<p>Addresses count <strong>bytes</strong>. A 32-bit register takes 4 bytes, so register $k$ (starting from 0) sits at $\text{base} + 4k$.</p>
<p>Four 32-bit registers from <code>0x40000000</code>: <code>…00</code>, <code>…04</code>, <code>…08</code>, <code>…0C</code>. The last one is at <code>0x4000000C</code>.</p>
<p>Pointer arithmetic does this scaling for you: if <code>p</code> is a <code>uint32_t*</code>, then <code>p + 1</code> is 4 bytes further on.</p>`
      },
      {
        title: 'GPIO',
        weight: 'medium',
        html: R`
<p>General-purpose input/output pins are either driven by the MCU (output) or read by it (input).</p>
<pre><code>pinMode(13, OUTPUT);        // configure direction
digitalWrite(13, HIGH);     // drive the pin high: LED on
int s = digitalRead(2);     // read a pin: HIGH or LOW
digitalWrite(13, !digitalRead(13));  // toggle
delay(1000);                // wait 1000 ms</code></pre>
<ul>
<li><code>pinMode</code> sets direction, <code>digitalWrite</code> sets the output level, <code>digitalRead</code> reads the level. <code>analogWrite</code> produces PWM, not a true analog voltage.</li>
<li>At register level there is typically a direction register, an output data register and an input data register, each with one bit per pin.</li>
<li>An input pin left unconnected "floats". Use a <strong>pull-up</strong> or <strong>pull-down</strong> resistor to give it a defined level.</li>
</ul>`
      },
      {
        title: 'Serial communication: UART, SPI, I2C',
        weight: 'high',
        html: R`
<table>
<tr><th></th><th>UART</th><th>SPI</th><th>I2C</th></tr>
<tr><td>Clock</td><td>None (asynchronous)</td><td>Shared clock (synchronous)</td><td>Shared clock (synchronous)</td></tr>
<tr><td>Wires</td><td>TX, RX</td><td>MOSI, MISO, SCK, SS</td><td>SDA, SCL</td></tr>
<tr><td>Devices</td><td>Point to point</td><td>One master, a select line per slave</td><td>Many devices, each with an address</td></tr>
<tr><td>Speed</td><td>Low to medium</td><td>Fastest</td><td>Medium</td></tr>
</table>
<p>UART is the usual link between a microcontroller and a computer.</p>
<h3>UART frame</h3>
<p>The line idles high. A frame is: <strong>1 start bit</strong> (low) → <strong>data bits</strong> (5 to 9, LSB first) → optional <strong>parity bit</strong> → <strong>1 or 2 stop bits</strong> (high).</p>
<ul>
<li>Notation: data bits, parity (N none, E even, O odd), stop bits. <strong>8N1</strong> is 8 data bits, no parity, 1 stop bit. <strong>7E1</strong> is 7 data bits, even parity, 1 stop bit.</li>
<li><strong>Even parity:</strong> the parity bit makes the total number of 1s even. <strong>Odd parity:</strong> makes it odd. Parity detects single-bit errors.</li>
<li><strong>Baud rate</strong> is bits per second. Both ends must use the same rate because there is no clock line.</li>
<li>An 8N1 frame is 10 bits on the wire, so 9600 baud carries 960 bytes per second.</li>
</ul>`
      },
      {
        title: 'Analog-to-digital converter (ADC)',
        weight: 'medium',
        html: R`
<p>An ADC converts an <strong>analog voltage into a digital number</strong> so the MCU can read sensors. (A DAC does the reverse.)</p>
<ul>
<li>An $n$-bit ADC has $2^n$ levels, giving codes from 0 to $2^n - 1$.</li>
<li><strong>Resolution</strong> (step size, the smallest voltage difference it can distinguish): $\dfrac{V_{ref}}{2^n}$.</li>
<li><strong>Digital code</strong> for an input: $\left\lfloor \dfrac{V_{in}}{V_{ref}} \times 2^n \right\rfloor$.</li>
<li><strong>Voltage from a code:</strong> $V_{in} \approx \text{code} \times \dfrac{V_{ref}}{2^n}$.</li>
</ul>
<p>10-bit ADC, 0 to 5 V: step $= 5/1024 = 4.88$ mV $\approx$ 0.005 V. 12-bit ADC at 3.3 V: step $= 3.3/4096 = 0.81$ mV.</p>
<p>Some texts divide by $2^n - 1$ instead of $2^n$. The difference is tiny, so pick the closest option.</p>`
      },
      {
        title: 'Timers, prescalers and PWM',
        weight: 'medium',
        html: R`
<p>A timer is a counter driven by a clock. It is used for <strong>precise time delays</strong>, periodic interrupts, measuring pulse widths and generating waveforms.</p>
<h3>Prescaler</h3>
<p>The prescaler <strong>divides the input clock</strong> to a lower frequency before it reaches the counter, so each tick lasts longer and the timer can measure longer intervals.</p>
$$f_{timer} = \frac{f_{clk}}{\text{prescaler}}, \qquad t_{tick} = \frac{\text{prescaler}}{f_{clk}}$$
<ul>
<li>An $n$-bit timer overflows after $2^n$ ticks: $t_{overflow} = \dfrac{2^n \times \text{prescaler}}{f_{clk}}$.</li>
<li>Ticks needed for a delay $t$: $\dfrac{t \times f_{clk}}{\text{prescaler}}$. It must fit in the timer's width.</li>
<li>If the desired interval is longer than the timer's maximum, <strong>use a (larger) prescaler</strong>.</li>
</ul>
<h3>PWM</h3>
<p>Pulse-width modulation switches a pin on and off quickly. It is generated with the <strong>timer/counter peripheral</strong>: the output is high while the counter is below a compare value.</p>
$$\text{duty cycle} = \frac{t_{on}}{T} \times 100\%, \qquad V_{avg} = \text{duty} \times V_{cc}$$
<p>With 8-bit PWM, <code>analogWrite(pin, 127)</code> is about 50% duty. PWM is used for LED dimming and motor speed control.</p>
<h3>Interrupts</h3>
<p>An interrupt makes the CPU pause the main program, run an <strong>interrupt service routine (ISR)</strong>, then resume. It avoids wasteful polling. Keep ISRs short and mark shared variables <code>volatile</code>.</p>`
      }
    ],

    formulas: [
      {
        group: 'Bit manipulation',
        items: [
          { name: 'Mask for bit n', code: '1 << n', note: R`Equals $2^n$.` },
          { name: 'Set bit n', code: 'x |= (1 << n);' },
          { name: 'Clear bit n', code: 'x &= ~(1 << n);' },
          { name: 'Toggle bit n', code: 'x ^= (1 << n);' },
          { name: 'Read bit n', code: '(x >> n) & 1' },
          { name: 'Write a field', code: 'x = (x & ~(mask << pos)) | (val << pos);' },
          { name: 'Shifts', tex: R`x \ll n = x \cdot 2^n, \qquad x \gg n = \lfloor x / 2^n \rfloor`, note: 'For unsigned values.' }
        ]
      },
      {
        group: 'Data types and addresses',
        items: [
          { name: 'Unsigned n-bit range', tex: R`0 \ \text{to}\ 2^n - 1`, note: '8 bits: 255. 16 bits: 65,535. 32 bits: about 4.29 billion.' },
          { name: 'Signed n-bit range', tex: R`-2^{n-1} \ \text{to}\ 2^{n-1} - 1` },
          { name: 'Register address', tex: R`\text{addr}_k = \text{base} + k \times \frac{\text{register width in bits}}{8}`, note: R`$k = 0, 1, 2, \dots$ For 32-bit registers the step is 4.` }
        ]
      },
      {
        group: 'UART',
        items: [
          { name: 'Bit time', tex: R`t_{bit} = \frac{1}{\text{baud rate}}` },
          { name: 'Bits per frame', tex: R`1_{\text{start}} + \text{data} + \text{parity} + \text{stop}`, note: '8N1 = 10 bits. 8E2 = 12 bits.' },
          { name: 'Throughput', tex: R`\text{bytes per second} = \frac{\text{baud rate}}{\text{bits per frame}}` }
        ]
      },
      {
        group: 'ADC',
        items: [
          { name: 'Levels', tex: R`2^n` },
          { name: 'Resolution (step)', tex: R`\Delta V = \frac{V_{ref}}{2^n}` },
          { name: 'Digital code', tex: R`\text{code} = \left\lfloor \frac{V_{in}}{V_{ref}} \times 2^n \right\rfloor` }
        ]
      },
      {
        group: 'Timers and PWM',
        items: [
          { name: 'Timer frequency', tex: R`f_{timer} = \frac{f_{clk}}{\text{prescaler}}` },
          { name: 'Overflow time', tex: R`t_{overflow} = \frac{2^n \times \text{prescaler}}{f_{clk}}` },
          { name: 'Ticks for a delay', tex: R`\text{count} = \frac{t \times f_{clk}}{\text{prescaler}}` },
          { name: 'Duty cycle', tex: R`D = \frac{t_{on}}{t_{on} + t_{off}}` },
          { name: 'Average PWM voltage', tex: R`V_{avg} = D \times V_{cc}` }
        ]
      }
    ],

    examples: [
      {
        tag: 'Register value after several operations',
        q: R`<p>An 8-bit register starts at <code>x = 0x3C</code>. The following run in order. What is the final value?</p><pre><code>x |= 0x03;
x &amp;= ~0x10;
x ^= 0x0C;</code></pre>`,
        a: R`
<p>Start: <code>0x3C</code> = <code>0011 1100</code>.</p>
<p><strong>Set</strong> bits 0 and 1: <code>0011 1100 | 0000 0011</code> = <code>0011 1111</code> = <code>0x3F</code>.</p>
<p><strong>Clear</strong> bit 4: <code>~0x10</code> = <code>1110 1111</code>. <code>0011 1111 &amp; 1110 1111</code> = <code>0010 1111</code> = <code>0x2F</code>.</p>
<p><strong>Toggle</strong> bits 2 and 3: <code>0010 1111 ^ 0000 1100</code> = <code>0010 0011</code> = <strong><code>0x23</code></strong>.</p>`
      },
      {
        tag: 'Register address',
        q: R`<p>The control registers of a peripheral start at <code>0x50000000</code>. There are 5 registers of 32 bits each. What is the address of the last register?</p>`,
        a: R`<p>Each register is 4 bytes. The registers are numbered 0 to 4, so the last is at base + $4 \times 4$ = base + 16 = base + <code>0x10</code>.</p><p><strong><code>0x50000010</code></strong>. Listing them helps: <code>…00, …04, …08, …0C, …10</code>.</p>`
      },
      {
        tag: 'Mask for a bit',
        q: R`<p>Which mask checks whether the bit at index 3 (0-based, from the right) of a byte <code>x</code> is 1? What does <code>(0x5A &gt;&gt; 3) &amp; 1</code> evaluate to?</p>`,
        a: R`<p>Mask = <code>1 &lt;&lt; 3</code> = <code>0000 1000</code> = <strong><code>0x08</code></strong>. Test with <code>x &amp; 0x08</code>.</p><p><code>0x5A</code> = <code>0101 1010</code>. Shifting right by 3 gives <code>0000 1011</code>. AND with 1 gives <strong>1</strong>, so bit 3 is set.</p>`
      },
      {
        tag: 'ADC',
        q: R`<p>A 10-bit ADC has a 5 V reference. (a) What is its resolution? (b) What code does it produce for an input of 2.0 V? (c) What voltage does a reading of 512 represent?</p>`,
        a: R`
<p><strong>(a)</strong> $5 / 2^{10} = 5/1024 = 4.88$ mV, about 0.005 V.</p>
<p><strong>(b)</strong> $2.0/5 \times 1024 = 409.6$, so the code is <strong>409</strong>.</p>
<p><strong>(c)</strong> $512 \times 5/1024 = $ <strong>2.5 V</strong>.</p>`
      },
      {
        tag: 'Timer and prescaler',
        q: R`<p>A 16-bit timer is clocked at 16 MHz. You want an interrupt every 0.5 s. Show that it is impossible without a prescaler, and find the count needed with a prescaler of 256.</p>`,
        a: R`
<p><strong>No prescaler:</strong> the timer overflows after $65536 / 16{,}000{,}000 = 4.1$ ms. Half a second would need 8,000,000 ticks, far more than 65,535.</p>
<p><strong>Prescaler 256:</strong> timer frequency $= 16{,}000{,}000 / 256 = 62{,}500$ Hz. Count for 0.5 s $= 0.5 \times 62{,}500 = $ <strong>31,250</strong>, which fits in 16 bits.</p>`
      },
      {
        tag: 'UART timing',
        q: R`<p>A sensor sends 100 bytes over UART configured as 8N1 at 9600 baud. How long does the transmission take? Is the frame <code>8E2</code> longer or shorter?</p>`,
        a: R`<p>8N1 uses $1 + 8 + 0 + 1 = 10$ bits per byte. Total bits: 1000. Time $= 1000/9600 = $ <strong>104 ms</strong>.</p><p>8E2 uses $1 + 8 + 1 + 2 = 12$ bits per byte, so the same data takes 125 ms: longer.</p>`
      },
      {
        tag: 'Parity',
        q: R`<p>The data byte <code>0x53</code> is sent with even parity. What is the parity bit? What would it be with odd parity?</p>`,
        a: R`<p><code>0x53</code> = <code>0101 0011</code> has four 1s.</p><p><strong>Even parity:</strong> the total must be even. Four is already even, so the parity bit is <strong>0</strong>.</p><p><strong>Odd parity:</strong> the total must be odd, so the parity bit is <strong>1</strong>.</p>`
      },
      {
        tag: 'PWM',
        q: R`<p>An 8-bit PWM output on a 5 V microcontroller is set with <code>analogWrite(pin, 64)</code>. What are the duty cycle and the average voltage?</p>`,
        a: R`<p>Duty cycle $= 64/255 \approx 25\%$.</p><p>Average voltage $\approx 0.25 \times 5 = $ <strong>1.25 V</strong>.</p>`
      }
    ],

    quiz: [
      { q: R`An 8-bit variable <code>x</code> is 0x00. After <code>x |= (1 &lt;&lt; 5);</code> its value is`, options: ['0x05', '0x10', '0x20', '0x50'], answer: 2, why: R`<code>1 &lt;&lt; 5</code> is binary 0010 0000 = 0x20. OR sets that bit.` },
      { q: R`What is <code>0xA5 &amp; 0x0F</code>?`, options: ['0xA0', '0x05', '0xAF', '0x0A'], answer: 1, why: R`ANDing with 0x0F keeps only the lower nibble: 1010 0101 &amp; 0000 1111 = 0000 0101.` },
      { q: R`The resolution of a 12-bit ADC with a 3.3 V reference is about`, options: ['0.8 mV', '3.2 mV', '12.9 mV', '275 mV'], answer: 0, why: R`$3.3/4096 = 0.000806$ V, about 0.8 mV.` },
      { q: R`Six 32-bit control registers start at 0x50000000. The address of the last register is`, options: ['0x50000018', '0x50000014', '0x50000006', '0x50000020'], answer: 1, why: R`Register 5 (the sixth) is at base + $5 \times 4 = 20$ = 0x14.` },
      { q: R`A UART link runs 8N1 at 9600 baud. How many bytes can it send per second?`, options: ['9600', '1200', '960', '800'], answer: 2, why: R`Each byte needs 10 bits (start + 8 data + stop): $9600/10 = 960$.` },
      { q: R`<code>uint8_t x = 250; x += 10;</code> What is the value of <code>x</code>?`, options: ['260', '255', '4', '0'], answer: 2, why: R`An 8-bit unsigned value wraps at 256: $260 - 256 = 4$.` },
      { q: R`What is <code>0x3C ^ 0xFF</code>?`, options: ['0x3C', '0xC3', '0xFF', '0x00'], answer: 1, why: R`XOR with all ones inverts every bit: 0011 1100 becomes 1100 0011.` },
      { q: R`A timer is fed from a 16 MHz clock through a prescaler of 64. One timer tick lasts`, options: ['0.0625 µs', '4 µs', '64 µs', '250 µs'], answer: 1, why: R`Timer frequency $= 16\,\text{MHz}/64 = 250$ kHz, so one tick is $1/250000$ s = 4 µs.` },
      { q: R`Which protocol is synchronous, uses only two wires (data and clock), and addresses each device on the bus?`, options: ['UART', 'SPI', 'I2C', 'CAN'], answer: 2, why: R`I2C uses SDA and SCL with device addresses. SPI needs a select line per device. UART has no clock.` },
      { q: R`<code>x = 0xF0; x &amp;= ~(1 &lt;&lt; 4);</code> The result is`, options: ['0xE0', '0xF0', '0x10', '0xD0'], answer: 0, why: R`Bit 4 is cleared: 1111 0000 becomes 1110 0000 = 0xE0.` },
      { q: R`Which component decodes instructions and coordinates the other units of a microcontroller?`, options: ['ALU', 'Control unit', 'RAM', 'Flash memory'], answer: 1, why: R`The control unit decodes and sequences. The ALU only performs arithmetic and logic.` },
      { q: R`A variable must count milliseconds up to 100,000. The smallest suitable type is`, options: ['uint8_t', 'int16_t', 'uint16_t', 'uint32_t'], answer: 3, why: R`uint16_t stops at 65,535, so 100,000 needs 32 bits.` },
      { q: R`Which is NOT a component of an embedded system itself?`, options: ['Processor', 'Sensors', 'Compiler', 'I/O ports'], answer: 2, why: R`The compiler (like the IDE) is a development tool on the host computer.` },
      { q: R`In an Arduino sketch, <code>digitalWrite(13, HIGH);</code>`, options: ['reads the level of pin 13', 'sets pin 13 as an input', 'drives pin 13 high', 'writes an analog voltage to pin 13'], answer: 2, why: R`digitalWrite sets the output level. pinMode sets direction and digitalRead reads.` }
    ]
  });
})();
