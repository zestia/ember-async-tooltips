export function placementClasses($tooltip) {
  return $tooltip.attr('class').split(/\s+/).filter(name => {
    return /is-(north|south|east|west)/.test(name);
  });
}
