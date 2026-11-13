(function () {
  const R = String.raw;
  window.SUBJECTS.push({
    id: 'deep-learning',
    name: 'Deep Learning',
    short: 'Deep Learning',
    level: 'Degree level',
    color: '#d2542a',
    blurb: 'MP neurons, perceptrons and linear separability, sigmoid neurons, gradient descent and its variants, feedforward networks, softmax with cross-entropy, and backpropagation.',
    chips: ['MP neuron', 'Perceptron', 'Gradient descent', 'Backprop', 'Softmax'],
    papers: 'Quiz 1 papers from Jul 2025, Oct 2025 and Jul 2026 (older sessions back to 2022 follow the same syllabus). Many question stems are images of equations, so the notes below are organised by the calculation each one tests.',

    pattern: {
      facts: [
        { k: 'Total marks', v: '40 – 50' },
        { k: 'Question types', v: 'MCQ, MSQ, numeric' },
        { k: 'Numeric share', v: 'About half' },
        { k: 'Precision', v: '2 decimal places' }
      ],
      rows: [
        { topic: 'MP neuron and Boolean functions', how: R`Threshold $\theta$ for AND / OR, inhibitory inputs, which function a given neuron computes, "is every linearly separable function representable?"`, weight: 'high' },
        { topic: 'Perceptron learning algorithm', how: R`Run the update rule over a few points in order: when do updates happen, final weights and bias, number of updates. Convergence on linearly separable data. Angle between $w$ and $x$ after an update.`, weight: 'high' },
        { topic: 'Sigmoid neuron and its gradient', how: R`Compute $\hat y$, the squared-error loss, and $\partial L/\partial w$ for one data point. Properties: smooth, differentiable, $\sigma'(0) = 1/4$, Taylor approximation.`, weight: 'high' },
        { topic: 'Gradient descent variants', how: R`Number of parameter updates for batch / mini-batch / SGD over given epochs. Match loss curves to learning rates or momentum values. True/false on momentum overshoot and noisy gradients.`, weight: 'high' },
        { topic: 'Feedforward network: forward pass', how: R`Output of a small network for given weights (often all zero or all equal), number of weights/parameters, softmax probabilities, cross-entropy loss value.`, weight: 'high' },
        { topic: 'Backpropagation', how: R`Gradient of the loss with respect to a specific weight in a tiny network. Which weights change after one step when $W_2$ is initialised to zero.`, weight: 'high' },
        { topic: 'Design choices', how: R`Linear activations collapse the network. Identical initialisation keeps neurons identical. Switching a classifier to regression: one linear output and MSE loss.`, weight: 'medium' },
        { topic: 'Representation power', how: R`MLP vs single perceptron, any Boolean function with one hidden layer, universal approximation with sigmoid neurons.`, weight: 'medium' }
      ]
    },

    tips: [
      R`Know $\sigma(0) = 0.5$ and $\sigma'(0) = 0.25$ by heart. Zero-initialised networks make every sigmoid output exactly 0.5, which turns many "compute the output" questions into one line.`,
      R`If all weights are equal (or zero) feeding a $K$-class softmax, every class gets probability $1/K$ and the cross-entropy loss is $\ln K$.`,
      R`Updates per epoch: batch GD = 1, SGD = $N$, mini-batch = $\lceil N/B \rceil$. Multiply by the number of epochs.`,
      R`For softmax with cross-entropy, the gradient at the output pre-activation is simply $\hat y - y$ (prediction minus one-hot label). Start every backprop from there.`,
      R`In MSQs on the perceptron, check the paper's convention: is the positive class predicted when $w^\top x \ge 0$ or $> 0$? The boundary case decides whether the first point triggers an update.`,
      R`Use natural log for cross-entropy unless the question says otherwise.`
    ],

    topics: [
      {
        title: 'McCulloch–Pitts (MP) neuron',
        weight: 'high',
        html: R`
<p>The MP neuron takes <strong>binary inputs</strong>, adds them up, and fires if the sum reaches a threshold $\theta$. There are no weights and nothing is learned.</p>
$$y = \begin{cases} 1 & \text{if } \sum_i x_i \ge \theta \text{ and no inhibitory input is active} \\ 0 & \text{otherwise} \end{cases}$$
<ul>
<li>Inputs are <strong>excitatory</strong> or <strong>inhibitory</strong>. If any inhibitory input is 1, the output is 0 regardless of the rest.</li>
<li>With $n$ excitatory inputs: <strong>OR</strong> needs $\theta = 1$, <strong>AND</strong> needs $\theta = n$.</li>
<li>NOT and NOR use inhibitory inputs with $\theta = 0$.</li>
<li>Geometrically it draws the line $\sum x_i = \theta$. So a single MP neuron can only represent <strong>linearly separable</strong> Boolean functions.</li>
</ul>
<p class="trap">Raising the threshold above the number of excitatory inputs means the neuron can never fire. With two excitatory inputs, $\theta = 3$ gives output 0 for every input.</p>`
      },
      {
        title: 'Perceptron and the perceptron learning algorithm',
        weight: 'high',
        html: R`
<p>The perceptron adds <strong>real-valued inputs</strong> and <strong>learnable weights</strong>:</p>
$$\hat y = \begin{cases} 1 & \text{if } w^\top x + b \ge 0 \\ 0 & \text{otherwise} \end{cases}$$
<p>The bias can be folded in as $w_0$ with a constant input $x_0 = 1$. The decision boundary $w^\top x + b = 0$ is a hyperplane and $w$ is perpendicular to it.</p>
<h3>Learning algorithm</h3>
<p>Go through the points. For each misclassified point:</p>
<ul>
<li>Positive point classified as negative: $w \leftarrow w + x$ (and $b \leftarrow b + 1$).</li>
<li>Negative point classified as positive: $w \leftarrow w - x$ (and $b \leftarrow b - 1$).</li>
</ul>
<p>With labels $y \in \{+1, -1\}$ this is one rule: $w \leftarrow w + \eta\,y\,x$, $b \leftarrow b + \eta\,y$.</p>
<h3>Why it works</h3>
<p>$\cos\alpha = \dfrac{w^\top x}{\lVert w\rVert\,\lVert x\rVert}$. A positive point should make an angle below 90° with $w$. Adding $x$ to $w$ increases $w^\top x$ by $\lVert x \rVert^2$, which rotates $w$ toward $x$.</p>
<p class="key"><strong>Convergence theorem.</strong> If the data are linearly separable, the algorithm makes a finite number of updates and stops. If they are not separable, it never converges.</p>`
      },
      {
        title: 'Linear separability and Boolean functions',
        weight: 'medium',
        html: R`
<ul>
<li>A dataset is <strong>linearly separable</strong> if one hyperplane puts all positive points on one side and all negative points on the other.</li>
<li>There are $2^{2^n}$ Boolean functions of $n$ inputs: 16 for $n = 2$, 256 for $n = 3$.</li>
<li>For $n = 2$, 14 of the 16 are linearly separable. The two that are not are <strong>XOR</strong> and <strong>XNOR</strong>.</li>
<li>A single perceptron cannot implement XOR.</li>
</ul>
<h3>Networks of perceptrons</h3>
<p>Any Boolean function of $n$ inputs can be represented <em>exactly</em> by a network with one hidden layer of $2^n$ perceptrons and one output perceptron. Each hidden unit fires for exactly one input pattern. That is sufficient, not necessary: many functions need far fewer.</p>`
      },
      {
        title: 'Sigmoid neuron',
        weight: 'high',
        html: R`
<p>A perceptron's output jumps from 0 to 1 at the threshold. The sigmoid neuron replaces the step with a smooth curve:</p>
$$\hat y = \sigma(w^\top x + b), \qquad \sigma(z) = \frac{1}{1+e^{-z}}$$
<ul>
<li>Output lies in $(0, 1)$ and can be read as a probability.</li>
<li>Smooth and differentiable everywhere, which is what gradient-based learning needs.</li>
<li>$\sigma(0) = 0.5$, $\sigma(-z) = 1 - \sigma(z)$.</li>
<li><strong>Derivative:</strong> $\sigma'(z) = \sigma(z)\,(1 - \sigma(z))$, with maximum value $0.25$ at $z = 0$.</li>
<li>With very large weights the curve becomes steep and approaches a perceptron's step.</li>
<li>For large $|z|$ the derivative is nearly zero: the neuron <strong>saturates</strong> and gradients vanish.</li>
</ul>
<h3>Taylor approximation near zero</h3>
<p>$\sigma(z) \approx \sigma(0) + \sigma'(0)\,z = \tfrac12 + \tfrac{z}{4}$. This is accurate only near $z = 0$. The sigmoid is not linear, and the approximation gets worse as $|z|$ grows.</p>
<p class="trap">A single sigmoid neuron still has a <em>linear</em> decision boundary ($w^\top x + b = 0$). Smooth output does not mean a curved boundary.</p>`
      },
      {
        title: 'Loss functions and gradient descent',
        weight: 'high',
        html: R`
<p>Learning means choosing parameters $\theta$ to minimise a loss $L(\theta)$.</p>
<ul>
<li><strong>Squared error:</strong> $L = \tfrac12(\hat y - y)^2$ (some questions drop the $\tfrac12$ or average over points, so read the definition).</li>
<li><strong>Cross-entropy:</strong> $L = -\sum_c y_c \log \hat y_c = -\log \hat y_{\text{true class}}$.</li>
</ul>
<p><strong>Gradient descent</strong> moves against the gradient, which is the direction of steepest increase (from the first-order Taylor expansion):</p>
$$\theta_{t+1} = \theta_t - \eta\,\nabla_\theta L(\theta_t)$$
<h3>Learning rate $\eta$</h3>
<ul>
<li>Too small: slow, smooth decrease.</li>
<li>Well chosen: fast, steady decrease.</li>
<li>Too large: the loss oscillates or diverges.</li>
</ul>
<p>For a sufficiently small learning rate on a smooth loss, each batch gradient step decreases the loss.</p>
<h3>Gradient for one sigmoid neuron with squared error</h3>
$$\frac{\partial L}{\partial w} = (\hat y - y)\,\hat y\,(1 - \hat y)\,x, \qquad \frac{\partial L}{\partial b} = (\hat y - y)\,\hat y\,(1 - \hat y)$$`
      },
      {
        title: 'Batch, stochastic and mini-batch gradient descent',
        weight: 'high',
        html: R`
<table>
<tr><th>Variant</th><th>Gradient from</th><th>Updates per epoch</th></tr>
<tr><td>Batch (vanilla) GD</td><td>all $N$ points</td><td>1</td></tr>
<tr><td>Stochastic GD</td><td>1 point</td><td>$N$</td></tr>
<tr><td>Mini-batch GD</td><td>$B$ points</td><td>$\lceil N/B \rceil$</td></tr>
</table>
<p>One <strong>epoch</strong> is one full pass over the data. Total updates = updates per epoch × epochs.</p>
<ul>
<li>Batch GD computes the true gradient but needs a full pass for every single update, which is far too expensive on huge datasets.</li>
<li>SGD uses a noisy <em>estimate</em> of the gradient, not the true gradient. The loss curve oscillates, but updates are cheap and frequent.</li>
<li>Mini-batch is the practical middle: less noise than SGD, many more updates than batch.</li>
</ul>`
      },
      {
        title: 'Momentum, Nesterov and adaptive learning rates',
        weight: 'medium',
        html: R`
<h3>Momentum</h3>
<p>Keep a running history of past updates so movement builds up along directions that stay consistent:</p>
$$u_t = \beta\,u_{t-1} + \eta\,\nabla L(w_t), \qquad w_{t+1} = w_t - u_t$$
<ul>
<li>$\beta = 0$ is vanilla gradient descent. Larger $\beta$ (0.9, 0.99) means more memory and faster travel through flat regions.</li>
<li>Downside: accumulated velocity can <strong>overshoot</strong> the minimum and oscillate in and out of a narrow valley. The higher $\beta$, the bigger the oscillations.</li>
</ul>
<h3>Nesterov accelerated gradient</h3>
<p>Look ahead first, then correct: compute the gradient at $w_t - \beta u_{t-1}$ instead of at $w_t$. This reduces overshooting.</p>
<h3>Adaptive methods</h3>
<ul>
<li><strong>AdaGrad:</strong> divides the learning rate by the root of the accumulated squared gradients. Good for sparse features, but the rate decays to nearly zero.</li>
<li><strong>RMSProp:</strong> uses an exponentially decaying average of squared gradients, so the rate does not die.</li>
<li><strong>Adam:</strong> RMSProp plus momentum, with bias correction of both running averages.</li>
</ul>
<p>Reading loss curves: more oscillation means larger learning rate or larger $\beta$. A flat, slow curve means a small learning rate.</p>`
      },
      {
        title: 'Feedforward neural networks',
        weight: 'high',
        html: R`
<p>A feedforward network stacks layers. For layer $k$ with input $h_{k-1}$ (and $h_0 = x$):</p>
$$a_k = W_k\,h_{k-1} + b_k \quad (\text{pre-activation}), \qquad h_k = g(a_k) \quad (\text{activation})$$
<p>The last layer uses an output function $O$ chosen for the task.</p>
<table>
<tr><th>Task</th><th>Output layer</th><th>Loss</th></tr>
<tr><td>Regression</td><td>linear, one neuron per target</td><td>squared error</td></tr>
<tr><td>Classification, $K$ classes</td><td>softmax, $K$ neurons</td><td>cross-entropy</td></tr>
</table>
<h3>Counting parameters</h3>
<p>A layer from $n_{\text{in}}$ to $n_{\text{out}}$ neurons has $n_{\text{in}} \times n_{\text{out}}$ weights and $n_{\text{out}}$ biases. Sum over layers. If the question says "weights", leave the biases out.</p>
<h3>Three facts tested repeatedly</h3>
<ul>
<li><strong>Linear hidden layers collapse.</strong> With identity activations, $W_3 W_2 W_1 x$ is just one matrix times $x$. A softmax on top makes the whole network a single softmax (multinomial logistic) regression with a linear decision boundary. It still trains, and gradients still flow.</li>
<li><strong>Symmetry.</strong> If all neurons in a layer start with identical weights and bias, they produce the same output and receive the same gradient, so they stay identical forever. The layer behaves like one neuron. This is why weights are initialised randomly.</li>
<li><strong>Depth gives non-linearity.</strong> A network with non-linear hidden units can learn non-linear decision boundaries, which a single perceptron cannot.</li>
</ul>
<p><strong>Universal approximation:</strong> one hidden layer of sigmoid neurons can approximate any continuous function to any desired precision, given enough neurons.</p>`
      },
      {
        title: 'Softmax and cross-entropy',
        weight: 'high',
        html: R`
$$\hat y_j = \frac{e^{a_j}}{\sum_{k=1}^{K} e^{a_k}}, \qquad L = -\log \hat y_{c} \quad (c = \text{true class})$$
<ul>
<li>Outputs are positive and sum to 1.</li>
<li>Only differences between pre-activations matter: adding a constant to every $a_j$ changes nothing.</li>
<li>Equal pre-activations give $\hat y_j = 1/K$ and loss $\ln K$.</li>
<li>For class 1 to have probability exactly $\tfrac12$: $e^{a_1} = \sum_{k \ne 1} e^{a_k}$.</li>
</ul>
<p class="key">The gradient of cross-entropy with respect to the output pre-activations is $\nabla_{a_L} L = \hat y - e(c)$, where $e(c)$ is the one-hot vector of the true class. For the true class the entry is $\hat y_c - 1$. For every other class it is $\hat y_j$.</p>`
      },
      {
        title: 'Backpropagation',
        weight: 'high',
        html: R`
<p>Backpropagation is the chain rule applied layer by layer from the output back to the input.</p>
<ol>
<li><strong>Output layer:</strong> $\nabla_{a_L} L = \hat y - y$ (softmax + cross-entropy, or linear output + $\tfrac12$ squared error).</li>
<li><strong>Weights of layer $k$:</strong> $\nabla_{W_k} L = (\nabla_{a_k} L)\,h_{k-1}^\top$, and $\nabla_{b_k} L = \nabla_{a_k} L$.</li>
<li><strong>Back to the previous activation:</strong> $\nabla_{h_{k-1}} L = W_k^\top\,(\nabla_{a_k} L)$.</li>
<li><strong>Through the activation function:</strong> $\nabla_{a_{k-1}} L = \nabla_{h_{k-1}} L \odot g'(a_{k-1})$. For sigmoid, $g' = h(1-h)$.</li>
</ol>
<p>In words: the gradient of a weight is (error signal at the neuron it feeds) × (activation of the neuron it comes from).</p>
<h3>Zero-initialised output weights</h3>
<p>Suppose $W_1$ is random and $W_2 = 0$. After one step:</p>
<ul>
<li>$\nabla_{W_2} L = (\hat y - y)\,h_1^\top \ne 0$, so <strong>$W_2$ changes</strong>.</li>
<li>$\nabla_{h_1} L = W_2^\top(\hat y - y) = 0$, so the gradient reaching $W_1$ is zero and <strong>$W_1$ stays the same</strong>.</li>
</ul>`
      }
    ],

    formulas: [
      {
        group: 'Neurons',
        items: [
          { name: 'MP neuron', tex: R`y = 1 \iff \sum_i x_i \ge \theta \ \text{ and no inhibitory input is 1}`, note: R`AND: $\theta = n$. OR: $\theta = 1$.` },
          { name: 'Perceptron', tex: R`\hat y = 1 \iff w^\top x + b \ge 0` },
          { name: 'Perceptron update', tex: R`w \leftarrow w + \eta\,y\,x, \quad b \leftarrow b + \eta\,y \qquad (y \in \{+1,-1\})`, note: 'Applied only to misclassified points.' },
          { name: 'Angle between w and x', tex: R`\cos\alpha = \frac{w^\top x}{\lVert w\rVert\,\lVert x\rVert}` },
          { name: 'Boolean functions of n inputs', tex: R`2^{2^n}` }
        ]
      },
      {
        group: 'Sigmoid',
        items: [
          { name: 'Sigmoid', tex: R`\sigma(z) = \frac{1}{1+e^{-z}}` },
          { name: 'Derivative', tex: R`\sigma'(z) = \sigma(z)\,\bigl(1-\sigma(z)\bigr)`, note: R`$\sigma(0) = 0.5$, $\sigma'(0) = 0.25$.` },
          { name: 'Taylor near 0', tex: R`\sigma(z) \approx \tfrac12 + \tfrac{z}{4}` },
          { name: 'Tanh (for reference)', tex: R`\tanh'(z) = 1 - \tanh^2(z)` }
        ]
      },
      {
        group: 'Losses and gradients',
        items: [
          { name: 'Squared error', tex: R`L = \tfrac12(\hat y - y)^2` },
          { name: 'Sigmoid neuron gradient', tex: R`\frac{\partial L}{\partial w} = (\hat y - y)\,\hat y\,(1-\hat y)\,x` },
          { name: 'Softmax', tex: R`\hat y_j = \frac{e^{a_j}}{\sum_k e^{a_k}}` },
          { name: 'Cross-entropy', tex: R`L = -\sum_c y_c \log \hat y_c = -\log \hat y_{\text{true}}`, note: R`Uniform output over $K$ classes: $L = \ln K$.` },
          { name: 'Softmax + CE gradient', tex: R`\nabla_{a_L} L = \hat y - y` }
        ]
      },
      {
        group: 'Optimisation',
        items: [
          { name: 'Gradient descent', tex: R`\theta_{t+1} = \theta_t - \eta\,\nabla L(\theta_t)` },
          { name: 'Updates per epoch', tex: R`\text{batch}: 1 \qquad \text{SGD}: N \qquad \text{mini-batch}: \lceil N/B \rceil` },
          { name: 'Momentum', tex: R`u_t = \beta\,u_{t-1} + \eta\,\nabla L(w_t), \quad w_{t+1} = w_t - u_t` },
          { name: 'Nesterov', tex: R`u_t = \beta\,u_{t-1} + \eta\,\nabla L(w_t - \beta u_{t-1})` },
          { name: 'AdaGrad', tex: R`v_t = v_{t-1} + (\nabla L)^2, \quad w_{t+1} = w_t - \frac{\eta}{\sqrt{v_t}+\epsilon}\,\nabla L` },
          { name: 'RMSProp', tex: R`v_t = \beta v_{t-1} + (1-\beta)(\nabla L)^2` },
          { name: 'Adam', tex: R`m_t = \beta_1 m_{t-1} + (1-\beta_1)\nabla L, \quad w_{t+1} = w_t - \frac{\eta\,\hat m_t}{\sqrt{\hat v_t}+\epsilon}`, note: R`$\hat m_t = m_t/(1-\beta_1^t)$, $\hat v_t = v_t/(1-\beta_2^t)$.` }
        ]
      },
      {
        group: 'Feedforward networks and backprop',
        items: [
          { name: 'Forward pass', tex: R`a_k = W_k h_{k-1} + b_k, \qquad h_k = g(a_k)` },
          { name: 'Parameter count', tex: R`\sum_{k=1}^{L} \bigl(n_{k-1}\,n_k + n_k\bigr)`, note: 'Drop the second term if only weights are asked.' },
          { name: 'Weight gradient', tex: R`\nabla_{W_k} L = (\nabla_{a_k} L)\,h_{k-1}^\top` },
          { name: 'Propagate back', tex: R`\nabla_{h_{k-1}} L = W_k^\top\,\nabla_{a_k} L` },
          { name: 'Through activation', tex: R`\nabla_{a_{k-1}} L = \nabla_{h_{k-1}} L \odot g'(a_{k-1})` }
        ]
      }
    ],

    examples: [
      {
        tag: 'Forward pass with zero weights',
        q: R`<p>A regression network has 2 inputs, one hidden layer of 3 sigmoid neurons and one linear output neuron. All hidden weights and all biases are 0. Each output weight is 100. What does it predict for the input (8, 3000)?</p>`,
        a: R`<p>Every hidden pre-activation is $0 \cdot 8 + 0 \cdot 3000 + 0 = 0$, so every hidden output is $\sigma(0) = 0.5$. The input values do not matter.</p><p>Output: $100 \times 0.5 \times 3 + 0 = $ <strong>150</strong>.</p>`
      },
      {
        tag: 'Perceptron learning algorithm',
        q: R`<p>Start with $w = (0, 0)$, $b = 0$. Predict $+1$ if $w^\top x + b \ge 0$, else $-1$. On a mistake, $w \leftarrow w + y\,x$ and $b \leftarrow b + y$. Process once, in order: $x_1 = (1,1), y = +1$; $x_2 = (-1,1), y = -1$; $x_3 = (0,2), y = +1$. Find the final parameters and the number of updates.</p>`,
        a: R`
<p><strong>$x_1$:</strong> $0 \ge 0$, predict $+1$. Correct, no update.</p>
<p><strong>$x_2$:</strong> $0 \ge 0$, predict $+1$, but $y = -1$. Update: $w = (0,0) - (-1,1) = (1,-1)$, $b = -1$.</p>
<p><strong>$x_3$:</strong> $1\cdot0 + (-1)\cdot2 - 1 = -3 &lt; 0$, predict $-1$, but $y = +1$. Update: $w = (1,-1) + (0,2) = (1,1)$, $b = 0$.</p>
<p><strong>Final $w = (1, 1)$, $b = 0$, after 2 updates.</strong></p>`
      },
      {
        tag: 'Number of updates',
        q: R`<p>Mini-batch gradient descent runs on 1000 data points with batch size 25 for 10 epochs. How many times is each parameter updated? What would it be with batch GD and with SGD?</p>`,
        a: R`<p>Mini-batch: $1000/25 = 40$ updates per epoch, so $40 \times 10 = $ <strong>400</strong>.</p><p>Batch GD: $1 \times 10 = 10$. SGD: $1000 \times 10 = 10{,}000$.</p>`
      },
      {
        tag: 'Softmax',
        q: R`<p>A 3-class softmax has pre-activations $(z, 1, 1)$. For what $z$ is the probability of class 1 exactly $\tfrac12$?</p>`,
        a: R`<p>$\dfrac{e^z}{e^z + e + e} = \dfrac12 \Rightarrow e^z = 2e \Rightarrow z = 1 + \ln 2 = $ <strong>1.69</strong>.</p>`
      },
      {
        tag: 'Gradient of a sigmoid neuron',
        q: R`<p>A sigmoid neuron has $w = 0$, $b = 0$. For the training example $x = 2$, $y = 1$ and loss $L = \tfrac12(\hat y - y)^2$, find $\partial L / \partial w$ and the weight after one gradient step with $\eta = 1$.</p>`,
        a: R`<p>$\hat y = \sigma(0) = 0.5$.</p><p>$\dfrac{\partial L}{\partial w} = (\hat y - y)\,\hat y(1-\hat y)\,x = (-0.5)(0.25)(2) = $ <strong>−0.25</strong>.</p><p>New weight: $w = 0 - 1 \times (-0.25) = 0.25$. The weight grows, which pushes $\hat y$ up toward the target of 1.</p>`
      },
      {
        tag: 'Backpropagation in a tiny network',
        q: R`<p>One input, one sigmoid hidden neuron, one linear output, no biases. $x = 1$, $w_1 = 0$ (input to hidden), $w_2 = 2$ (hidden to output), target $y = 2$, loss $L = \tfrac12(\hat y - y)^2$. Find $\partial L/\partial w_2$ and $\partial L/\partial w_1$.</p>`,
        a: R`
<p><strong>Forward.</strong> $h = \sigma(0 \cdot 1) = 0.5$. $\hat y = 2 \times 0.5 = 1$. $L = \tfrac12(1-2)^2 = 0.5$.</p>
<p><strong>Backward.</strong> $\partial L/\partial \hat y = \hat y - y = -1$.</p>
<p>$\partial L/\partial w_2 = (-1)\cdot h = $ <strong>−0.5</strong>.</p>
<p>$\partial L/\partial h = (-1)\cdot w_2 = -2$. Through the sigmoid: $-2 \times h(1-h) = -2 \times 0.25 = -0.5$.</p>
<p>$\partial L/\partial w_1 = -0.5 \times x = $ <strong>−0.5</strong>.</p>`
      },
      {
        tag: 'Parameters and loss with equal weights',
        q: R`<p>A classifier has 50 inputs, hidden layers of 20 and 10 sigmoid neurons, and a 10-class softmax output. (a) How many weights and how many parameters does it have? (b) If every weight has the same value and biases are zero, what is the cross-entropy loss for any data point?</p>`,
        a: R`
<p><strong>(a)</strong> Weights: $50\times20 + 20\times10 + 10\times10 = 1000 + 200 + 100 = $ <strong>1300</strong>. Biases: $20 + 10 + 10 = 40$. Parameters: <strong>1340</strong>.</p>
<p><strong>(b)</strong> With identical weights every output neuron receives the same pre-activation, so the softmax output is uniform: $\hat y_j = 1/10$. Loss $= -\ln(0.1) = \ln 10 = $ <strong>2.30</strong>. It does not depend on the input or the true class.</p>`
      },
      {
        tag: 'Momentum',
        q: R`<p>Minimise $L(w) = w^2$ from $w_0 = 1$ with $\eta = 0.1$ and momentum $\beta = 0.9$ ($u_0 = 0$). Find $w_2$. Compare with vanilla gradient descent.</p>`,
        a: R`
<p>Gradient is $2w$.</p>
<p><strong>Step 1:</strong> $u_1 = 0.9\cdot0 + 0.1\cdot2 = 0.2$. $w_1 = 0.8$.</p>
<p><strong>Step 2:</strong> $u_2 = 0.9\cdot0.2 + 0.1\cdot1.6 = 0.34$. $w_2 = 0.8 - 0.34 = $ <strong>0.46</strong>.</p>
<p>Vanilla GD: $w_1 = 0.8$, $w_2 = 0.8 - 0.16 = 0.64$. Momentum moves faster, and for the same reason it will overshoot past $w = 0$ a few steps later.</p>`
      }
    ],

    quiz: [
      { q: R`An MP neuron with 3 excitatory inputs and no inhibitory inputs should implement AND. The threshold must be`, options: ['0', '1', '2', '3'], answer: 3, why: R`AND fires only when all inputs are 1, so the sum must reach $n = 3$.` },
      { q: R`Mini-batch gradient descent on 12,000 points with batch size 40 runs for 5 epochs. The number of parameter updates is`, options: ['300', '1,500', '5', '60,000'], answer: 1, why: R`$12000/40 = 300$ updates per epoch, times 5 epochs.` },
      { q: R`The value of $\sigma'(0)$ for the logistic sigmoid is`, options: ['0', '0.25', '0.5', '1'], answer: 1, why: R`$\sigma'(z) = \sigma(z)(1-\sigma(z)) = 0.5 \times 0.5 = 0.25$.` },
      { q: R`A network has 10 inputs, one hidden layer of 5 neurons and 3 output neurons, with biases. The total number of parameters is`, options: ['65', '73', '150', '18'], answer: 1, why: R`$(10\times5 + 5) + (5\times3 + 3) = 55 + 18 = 73$.` },
      { q: R`All pre-activations of a 4-class softmax are equal. The cross-entropy loss (natural log) is closest to`, options: ['0', '0.25', '1.39', '4'], answer: 2, why: R`Each class gets probability 1/4, so $L = \ln 4 = 1.386$.` },
      { q: R`Which Boolean function of two inputs cannot be implemented by a single perceptron?`, options: ['AND', 'OR', 'NAND', 'XOR'], answer: 3, why: R`XOR (and XNOR) are not linearly separable. The other 14 two-input functions are.` },
      { q: R`A perceptron has $w = (1, -2)$, no bias, and predicts positive when $w^\top x \ge 0$. The positive point $x = (1, 2)$ is presented. After the perceptron update, $w$ is`, options: ['(1, −2)', '(2, 0)', '(0, −4)', '(1, 2)'], answer: 1, why: R`$w^\top x = 1 - 4 = -3 < 0$, so it is misclassified. $w \leftarrow w + x = (2, 0)$.` },
      { q: R`A network uses the identity activation in every hidden layer and a softmax output. Which statement is TRUE?`, options: ['It can learn non-linear decision boundaries because softmax is non-linear.', 'It is equivalent to a single softmax regression on the input.', 'It cannot be trained because gradients do not flow through linear layers.', 'The weight matrices converge to identity matrices.'], answer: 1, why: R`A product of linear maps is one linear map, so the network computes $\text{softmax}(Wx + b)$ with a linear decision boundary.` },
      { q: R`All $n$ neurons in a sigmoid hidden layer start with identical weights and biases. After many gradient descent steps the neurons will`, options: ['have different weights', 'still be identical to each other', 'all have zero weights', 'have zero gradients throughout'], answer: 1, why: R`Identical neurons produce the same output and receive the same gradient, so they stay identical. The gradients are generally not zero.` },
      { q: R`How many Boolean functions of 3 inputs exist?`, options: ['8', '16', '64', '256'], answer: 3, why: R`$2^{2^3} = 2^8 = 256$.` },
      { q: R`A network has random hidden weights $W_1$, output weights $W_2 = 0$ and zero biases, with softmax output and cross-entropy loss. After one SGD step`, options: ['both $W_1$ and $W_2$ change', 'only $W_1$ changes', 'only $W_2$ changes', 'neither changes'], answer: 2, why: R`$\nabla_{W_2} = (\hat y - y)h^\top \ne 0$, but the signal sent back to the hidden layer is $W_2^\top(\hat y - y) = 0$, so $W_1$ does not move in the first step.` },
      { q: R`Which statement about stochastic gradient descent (batch size 1) is TRUE?`, options: ['It computes the true gradient of the total loss at each step.', 'It makes one update per epoch.', 'Each update uses a noisy estimate of the gradient.', 'It is guaranteed to decrease the total loss at every step.'], answer: 2, why: R`One point gives only an estimate of the full gradient, so individual steps can increase the total loss. It makes $N$ updates per epoch.` }
    ]
  });
})();
