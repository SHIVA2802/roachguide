const tool = document.querySelector('#roach-tool');
if (tool) {
  const steps = [...tool.querySelectorAll('.tool-step')];
  const result = tool.querySelector('.tool-result');
  const answers = {};

  tool.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    const step = button.closest('.tool-step');
    const stepNumber = step.dataset.step;
    answers[stepNumber] = button.dataset.value;

    step.classList.remove('active');
    const next = steps.find(s => Number(s.dataset.step) === Number(stepNumber) + 1);

    if (next) {
      next.classList.add('active');
      next.scrollIntoView({behavior:'smooth', block:'nearest'});
    } else {
      const frequency = answers['2'];
      const nymphs = answers['3'];

      let heading = 'Start with an integrated control approach';
      let body = 'Reduce food and water access, identify activity hotspots, use an appropriate targeted treatment according to its label, seal practical entry points and monitor activity.';

      if (frequency === 'daily' || frequency === 'many' || nymphs === 'yes') {
        heading = 'Consider this a higher-priority infestation';
        body = 'Repeated activity or young cockroaches can justify a more systematic response. Map activity, remove food and water sources, use appropriate treatment according to product labels, and consider professional pest-control advice if activity persists.';
      } else if (frequency === 'occasional') {
        heading = 'Start with prevention and monitoring';
        body = 'For occasional sightings, begin by reducing food and water opportunities, checking likely entry points and monitoring whether activity continues.';
      }

      result.innerHTML = `<h3>${heading}</h3><p>${body}</p><button id="restart-tool" class="button secondary">Start again</button>`;
      result.hidden = false;
      document.getElementById('restart-tool').addEventListener('click', () => location.reload());
    }
  });
}
