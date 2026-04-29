export default function supportsCSSAnchorPositioning() {
  try {
    return (
      CSS.supports('anchor-name', '--a') &&
      CSS.supports('position-anchor', '--a')
    );
  } catch {
    return false;
  }
}
