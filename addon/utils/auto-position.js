const { hasDirection } = window.positionUtils;

export default function autoPosition(before = {}) {
  const after = {
    N: Boolean(before.S),
    E: Boolean(before.N || before.S ? before.E : before.W),
    S: Boolean(before.N),
    W: Boolean(before.N || before.S ? before.W : before.E)
  };

  if (!hasDirection(after)) {
    after.S = true;
  }

  return after;
}
