export const transformServerThresholdsToThresholds = ({
  actualHyper,
  hyper,
  hypo,
  warning,
}) => ({
  actualHyper: {
    preIdealInterval: actualHyper.beforeEating,
    postIdealInterval: actualHyper.afterEating,
    noctIdealInterval: actualHyper.beforeBed,
  },
  hyper: {
    preIdealInterval: hyper.beforeEating,
    postIdealInterval: hyper.afterEating,
    noctIdealInterval: hyper.beforeBed,
  },
  hypo: {
    preIdealInterval: hypo.beforeEating,
    postIdealInterval: hypo.afterEating,
    noctIdealInterval: hypo.beforeBed,
  },
  warning: {
    preIdealInterval: warning.beforeEating,
    postIdealInterval: warning.afterEating,
    noctIdealInterval: warning.beforeBed,
  },
});
